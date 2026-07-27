import type { Transaction } from '../types/budget'

const STORAGE_KEY = 'budget_planner_v2_transactions'

/**
 * Load transactions safely from localStorage
 */
export function loadTransactions(): Transaction[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
  } catch (error) {
    console.error('Error saving transactions to localStorage:', error)
  }
}
