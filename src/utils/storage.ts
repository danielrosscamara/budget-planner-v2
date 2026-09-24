import type { Transaction, Account } from '../types/budget'

const TRANSACTIONS_STORAGE_KEY = 'budget_planner_v2_transactions'
const ACCOUNTS_STORAGE_KEY = 'budget_planner_v2_accounts'

export const DEFAULT_ACCOUNTS: Account[] = [
  {
    id: 'acc-1',
    name: 'GCash',
    type: 'ewallet',
    balance: 15450,
    color: '#007dfe',
    icon: '📱',
    accountNumber: '0917 ••• 4589',
  },
  {
    id: 'acc-2',
    name: 'Maya',
    type: 'ewallet',
    balance: 5200,
    color: '#00d632',
    icon: '💳',
    accountNumber: '0918 ••• 1234',
  },
  {
    id: 'acc-3',
    name: 'BDO Unibank',
    type: 'bank',
    balance: 32000,
    color: '#1e40af',
    icon: '🏦',
    accountNumber: '•••• 8901',
  },
  {
    id: 'acc-4',
    name: 'Cash on Hand',
    type: 'cash',
    balance: 2850,
    color: '#10b981',
    icon: '💵',
  },
]

/**
 * Load transactions safely from localStorage
 */
export function loadTransactions(): Transaction[] {
  try {
    const data = localStorage.getItem(TRANSACTIONS_STORAGE_KEY)
    if (!data) return []
    const parsed = JSON.parse(data) as Transaction[]
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error('Error loading transactions from localStorage:', error)
    return []
  }
}

/**
 * Save transactions array to localStorage
 */
export function saveTransactions(transactions: Transaction[]): void {
  try {
    localStorage.setItem(TRANSACTIONS_STORAGE_KEY, JSON.stringify(transactions))
  } catch (error) {
    console.error('Error saving transactions to localStorage:', error)
  }
}

/**
 * Load accounts safely from localStorage (defaults to initial starter accounts)
 */
export function loadAccounts(): Account[] {
  try {
    const data = localStorage.getItem(ACCOUNTS_STORAGE_KEY)
    if (!data) return DEFAULT_ACCOUNTS
    const parsed = JSON.parse(data) as Account[]
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_ACCOUNTS
  } catch (error) {
    console.error('Error loading accounts from localStorage:', error)
    return DEFAULT_ACCOUNTS
  }
}

/**
 * Save accounts array to localStorage
 */
export function saveAccounts(accounts: Account[]): void {
  try {
    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts))
  } catch (error) {
    console.error('Error saving accounts to localStorage:', error)
  }
}

