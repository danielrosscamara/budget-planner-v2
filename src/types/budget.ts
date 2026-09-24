export type TransactionType = 'income' | 'expense'
export type TabType = 'transactions' | 'accounts' | 'analytics' | 'goals'
export type AccountType = 'ewallet' | 'bank' | 'cash' | 'savings'

export type Category = 
  | 'Salary' 
  | 'Freelance' 
  | 'Food & Dining' 
  | 'Transportation' 
  | 'Utilities & Bills' 
  | 'Entertainment' 
  | 'Shopping' 
  | 'Other'

export interface Account {
  id: string
  name: string
  type: AccountType
  balance: number
  color: string
  icon: string
  accountNumber?: string
}

export interface Transaction {
  id: string
  title: string
  amount: number
  type: TransactionType
  category: Category
  date: string
  accountId?: string
}
