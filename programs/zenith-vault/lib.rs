use anchor_lang::prelude::*;

declare_id!("ZEN1VAuLT11111111111111111111111111111111");

#[program]
pub mod zenith_vault {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let vault = &mut ctx.accounts.vault;
        vault.authority = ctx.accounts.authority.key();
        vault.balance = 0;
        vault.bump = ctx.bumps.vault;
        msg!("✅ Vault initialized");
        Ok(())
    }

    pub fn deposit(ctx: Context<Deposit>, amount: u64) -> Result<()> {
        let vault = &mut ctx.accounts.vault;
        let from = &ctx.accounts.from;
        let to = ctx.accounts.to;

        // Transfer SOL
        let ix = anchor_lang::system_program::transfer(
            from.key(),
            to.key(),
            amount,
        );

        anchor_lang::system_program::invoke(
            &ix,
            &[from, to],
        )?;

        vault.balance += amount;
        msg!("💰 Deposited {} lamports", amount);
        Ok(())
    }

    pub fn withdraw(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
        let vault = &mut ctx.accounts.vault;
        require!(amount <= vault.balance, ZenithError::InsufficientFunds);

        let seeds = &[
            b"vault",
            vault.authority.as_ref(),
            &[vault.bump],
        ];
        let signer_seeds = &[&seeds[..]];

        let from = ctx.accounts.vault.to_account_info();
        let to = &ctx.accounts.to;

        let ix = anchor_lang::system_program::transfer(
            from.key(),
            to.key(),
            amount,
        );

        anchor_lang::system_program::invoke_signed(
            &ix,
            &[from, to],
            signer_seeds,
        )?;

        vault.balance -= amount;
        msg!("💸 Withdrew {} lamports", amount);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 8 + 1,
        seeds = [b"vault", authority.key().as_ref()],
        bump
    )]
    pub vault: Account<'info, Vault>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Deposit<'info> {
    #[account(
        mut,
        seeds = [b"vault", vault.authority.as_ref()],
        bump = vault.bump
    )]
    pub vault: Account<'info, Vault>,
    #[account(mut)]
    pub from: Signer<'info>,
    /// CHECK: This is safe because we're just transferring SOL
    pub to: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(
        mut,
        seeds = [b"vault", vault.authority.as_ref()],
        bump = vault.bump
    )]
    pub vault: Account<'info, Vault>,
    /// CHECK: This is safe because we're just transferring SOL
    pub to: AccountInfo<'info>,
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Vault {
    pub authority: Pubkey,
    pub balance: u64,
    pub bump: u8,
}

#[error_code]
pub enum ZenithError {
    #[msg("Insufficient funds")]
    InsufficientFunds,
}