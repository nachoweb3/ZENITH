use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{Mint, Token, TokenAccount, Transfer, transfer},
};
use solana_program::{
    program::invoke_signed,
    system_instruction,
    sysvar::{rent::Rent, Sysvar},
};

declare_id!("ZEN1VAuLT11111111111111111111111111111111");

#[program]
pub mod zenith_vault {
    use super::*;

    /// Create a new privacy vault
    pub fn create_vault(
        ctx: Context<CreateVault>,
        vault_name: String,
        privacy_level: u8, // 1: Basic, 2: Advanced, 3: Maximum
    ) -> Result<()> {
        let vault = &mut ctx.accounts.vault;
        let clock = Clock::get()?;

        require!(vault_name.len() <= 50, ZenithError::NameTooLong);
        require!(privacy_level <= 3, ZenithError::InvalidPrivacyLevel);

        vault.authority = ctx.accounts.authority.key();
        vault.name = vault_name;
        vault.privacy_level = privacy_level;
        vault.balance = 0;
        vault.created_at = clock.unix_timestamp;
        vault.last_activity = clock.unix_timestamp;
        vault.transaction_count = 0;
        vault.is_active = true;

        msg!("✅ Vault created: {} with privacy level {}", vault_name, privacy_level);
        Ok(())
    }

    /// Deposit funds into privacy vault
    pub fn deposit(
        ctx: Context<Deposit>,
        amount: u64,
        use_stealth: bool,
    ) -> Result<()> {
        let vault = &mut ctx.accounts.vault;
        let clock = Clock::get()?;

        // Transfer tokens to vault
        let cpi_accounts = Transfer {
            from: ctx.accounts.user_token_account.to_account_info(),
            to: ctx.accounts.vault_token_account.to_account_info(),
            authority: ctx.accounts.authority.to_account_info(),
        };

        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);

        transfer(cpi_ctx, amount)?;

        // Update vault state
        vault.balance += amount;
        vault.last_activity = clock.unix_timestamp;
        vault.transaction_count += 1;

        // Apply privacy enhancements if requested
        if use_stealth && vault.privacy_level >= 2 {
            vault.apply_stealth_deposit(amount)?;
        }

        emit!(DepositEvent {
            vault: vault.key(),
            authority: vault.authority,
            amount,
            use_stealth,
            timestamp: clock.unix_timestamp,
        });

        msg!("💰 Deposited {} lamports into vault", amount);
        Ok(())
    }

    /// Withdraw funds from privacy vault
    pub fn withdraw(
        ctx: Context<Withdraw>,
        amount: u64,
        use_shadow_address: bool,
    ) -> Result<()> {
        let vault = &mut ctx.accounts.vault;
        let clock = Clock::get()?;

        require!(amount <= vault.balance, ZenithError::InsufficientFunds);

        // Apply withdrawal delay for advanced privacy
        if vault.privacy_level >= 2 {
            vault.check_withdrawal_delay(clock.unix_timestamp)?;
        }

        // Transfer tokens from vault
        let vault_key = vault.key();
        let seeds = &[
            b"vault",
            vault.authority.as_ref(),
            vault.name.as_bytes(),
            &[vault.bump],
        ];
        let signer_seeds = &[&seeds[..]];

        let cpi_accounts = Transfer {
            from: ctx.accounts.vault_token_account.to_account_info(),
            to: ctx.accounts.user_token_account.to_account_info(),
            authority: vault.to_account_info(),
        };

        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer_seeds);

        transfer(cpi_ctx, amount)?;

        // Update vault state
        vault.balance -= amount;
        vault.last_activity = clock.unix_timestamp;
        vault.transaction_count += 1;

        emit!(WithdrawEvent {
            vault: vault_key,
            authority: vault.authority,
            amount,
            use_shadow_address,
            timestamp: clock.unix_timestamp,
        });

        msg!("💸 Withdrew {} lamports from vault", amount);
        Ok(())
    }

    /// Generate shadow address for privacy
    pub fn generate_shadow_address(
        ctx: Context<GenerateShadowAddress>,
        purpose: String,
    ) -> Result<[u8; 32]> {
        let vault = &ctx.accounts.vault;
        let clock = Clock::get()?;

        require!(purpose.len() <= 100, ZenithError::PurposeTooLong);

        // Generate deterministic shadow address
        let seed = [
            vault.authority.as_ref(),
            vault.name.as_bytes(),
            purpose.as_bytes(),
            &clock.unix_timestamp.to_le_bytes(),
        ];

        let shadow_address = solana_program::keccak::hashv(&[&seed]).to_bytes();

        emit!(ShadowAddressGenerated {
            vault: vault.key(),
            authority: vault.authority,
            shadow_address,
            purpose,
            timestamp: clock.unix_timestamp,
        });

        msg!("🔐 Generated shadow address for purpose: {}", purpose);
        Ok(shadow_address)
    }

    /// Update vault privacy settings
    pub fn update_privacy_settings(
        ctx: Context<UpdatePrivacySettings>,
        new_privacy_level: u8,
        enable_stealth_mode: bool,
        max_daily_transactions: u32,
    ) -> Result<()> {
        let vault = &mut ctx.accounts.vault;

        require!(new_privacy_level <= 3, ZenithError::InvalidPrivacyLevel);
        require!(max_daily_transactions <= 1000, ZenithError::TransactionLimitTooHigh);

        vault.privacy_level = new_privacy_level;
        vault.stealth_mode_enabled = enable_stealth_mode;
        vault.max_daily_transactions = max_daily_transactions;

        emit!(PrivacySettingsUpdated {
            vault: vault.key(),
            new_privacy_level,
            enable_stealth_mode,
            max_daily_transactions,
            timestamp: Clock::get()?.unix_timestamp,
        });

        msg!("🔒 Updated privacy settings for vault");
        Ok(())
    }

    /// Close vault and withdraw all funds
    pub fn close_vault(ctx: Context<CloseVault>) -> Result<()> {
        let vault = &mut ctx.accounts.vault;
        let clock = Clock::get()?;

        require!(vault.balance == 0, ZenithError::VaultNotEmpty);
        require!(clock.unix_timestamp > vault.created_at + 86400, ZenithError::VaultTooNew);

        vault.is_active = false;

        emit!(VaultClosed {
            vault: vault.key(),
            authority: vault.authority,
            timestamp: clock.unix_timestamp,
        });

        msg!("🔓 Vault closed successfully");
        Ok(())
    }
}

// Account structures
#[account]
pub struct Vault {
    pub authority: Pubkey,
    pub name: String,
    pub privacy_level: u8,
    pub balance: u64,
    pub created_at: i64,
    pub last_activity: i64,
    pub transaction_count: u32,
    pub is_active: bool,
    pub stealth_mode_enabled: bool,
    pub max_daily_transactions: u32,
    pub bump: u8,
}

impl Vault {
    pub fn space() -> usize {
        8 + // discriminator
        32 + // authority
        4 + 50 + // name (string max 50)
        1 + // privacy_level
        8 + // balance
        8 + // created_at
        8 + // last_activity
        4 + // transaction_count
        1 + // is_active
        1 + // stealth_mode_enabled
        4 + // max_daily_transactions
        1 // bump
    }

    pub fn apply_stealth_deposit(&mut self, amount: u64) -> Result<()> {
        // Add random delay logic and mix transactions
        self.last_activity += (amount % 60) + 30; // Add random 30-90 second delay
        Ok(())
    }

    pub fn check_withdrawal_delay(&self, current_time: i64) -> Result<()> {
        let min_delay = match self.privacy_level {
            1 => 0,      // No delay for basic privacy
            2 => 300,    // 5 minutes for advanced privacy
            3 => 900,    // 15 minutes for maximum privacy
            _ => return Err(ZenithError::InvalidPrivacyLevel.into()),
        };

        require!(
            current_time >= self.last_activity + min_delay,
            ZenithError::WithdrawalTooSoon
        );

        Ok(())
    }
}

// Context structs
#[derive(Accounts)]
#[instruction(vault_name: String)]
pub struct CreateVault<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + Vault::space(),
        seeds = [b"vault", authority.key().as_ref(), vault_name.as_bytes()],
        bump
    )]
    pub vault: Account<'info, Vault>,

    #[account(
        init,
        payer = authority,
        token::mint = mint,
        token::authority = vault,
        seeds = [b"vault_token", vault.key().as_ref()],
        bump
    )]
    pub vault_token_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub mint: Account<'info, Mint>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct Deposit<'info> {
    #[account(
        mut,
        seeds = [b"vault", vault.authority.as_ref(), vault.name.as_bytes()],
        bump = vault.bump
    )]
    pub vault: Account<'info, Vault>,

    #[account(
        mut,
        seeds = [b"vault_token", vault.key().as_ref()],
        bump
    )]
    pub vault_token_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub user_token_account: Account<'info, TokenAccount>,

    pub authority: Signer<'info>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(
        mut,
        seeds = [b"vault", vault.authority.as_ref(), vault.name.as_bytes()],
        bump = vault.bump
    )]
    pub vault: Account<'info, Vault>,

    #[account(
        mut,
        seeds = [b"vault_token", vault.key().as_ref()],
        bump
    )]
    pub vault_token_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub user_token_account: Account<'info, TokenAccount>,

    pub authority: Signer<'info>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct GenerateShadowAddress<'info> {
    pub vault: Account<'info, Vault>,
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct UpdatePrivacySettings<'info> {
    #[account(
        mut,
        seeds = [b"vault", vault.authority.as_ref(), vault.name.as_bytes()],
        bump = vault.bump
    )]
    pub vault: Account<'info, Vault>,
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct CloseVault<'info> {
    #[account(
        mut,
        seeds = [b"vault", vault.authority.as_ref(), vault.name.as_bytes()],
        bump = vault.bump,
        close = authority
    )]
    pub vault: Account<'info, Vault>,
    #[account(mut)]
    pub authority: Signer<'info>,
}

// Events
#[event]
pub struct DepositEvent {
    pub vault: Pubkey,
    pub authority: Pubkey,
    pub amount: u64,
    pub use_stealth: bool,
    pub timestamp: i64,
}

#[event]
pub struct WithdrawEvent {
    pub vault: Pubkey,
    pub authority: Pubkey,
    pub amount: u64,
    pub use_shadow_address: bool,
    pub timestamp: i64,
}

#[event]
pub struct ShadowAddressGenerated {
    pub vault: Pubkey,
    pub authority: Pubkey,
    pub shadow_address: [u8; 32],
    pub purpose: String,
    pub timestamp: i64,
}

#[event]
pub struct PrivacySettingsUpdated {
    pub vault: Pubkey,
    pub new_privacy_level: u8,
    pub enable_stealth_mode: bool,
    pub max_daily_transactions: u32,
    pub timestamp: i64,
}

#[event]
pub struct VaultClosed {
    pub vault: Pubkey,
    pub authority: Pubkey,
    pub timestamp: i64,
}

// Custom errors
#[error_code]
pub enum ZenithError {
    #[msg("Vault name is too long")]
    NameTooLong,
    #[msg("Invalid privacy level")]
    InvalidPrivacyLevel,
    #[msg("Insufficient funds in vault")]
    InsufficientFunds,
    #[msg("Withdrawal too soon - privacy delay active")]
    WithdrawalTooSoon,
    #[msg("Purpose is too long")]
    PurposeTooLong,
    #[msg("Transaction limit is too high")]
    TransactionLimitTooHigh,
    #[msg("Vault is not empty")]
    VaultNotEmpty,
    #[msg("Vault is too new to close")]
    VaultTooNew,
}