export type TransactionType = 'income' | 'expense'
export type TabType = 'transactions' | 'accounts' | 'analytics' | 'goals'


export type Category = 
  | 'Salary' 
  | 'Freelance' 
  | 'Food & Dining' 
  | 'Transportation' 
  | 'Utilities & Bills' 
  | 'Entertainment' 
  | 'Shopping' 
  | 'Other'

export interface Transaction {
  id: string
  title: string
  amount: number
  type: TransactionType
  category: Category
  date: string
}
