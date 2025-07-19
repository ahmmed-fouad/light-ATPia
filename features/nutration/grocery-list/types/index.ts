export interface GroceryItem {
  id: number;
  name: string;
  qty: string;
  category: string;
  bought: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  name: string;
  color: string;
  icon: string;
  description: string;
}

export interface Template {
  id: string;
  name: string;
  items: string[];
  description: string;
  category: 'weekly' | 'monthly' | 'custom';
}

export interface SmartSuggestion {
  id: string;
  name: string;
  category: string;
  frequency: number; // How often it's added
  lastAdded?: Date;
}

export interface GroceryListState {
  items: GroceryItem[];
  notes: string;
  selectedTemplate: Template | null;
  isLoading: boolean;
  showAddForm: boolean;
  searchQuery: string;
  filterCategory: string | null;
  sortBy: 'name' | 'category' | 'createdAt' | 'bought';
  sortOrder: 'asc' | 'desc';
}

export interface AddItemForm {
  name: string;
  qty: string;
  category: string;
}

export interface ChartData {
  name: string;
  value: number;
  color: string;
  percentage: number;
}

export interface ListStats {
  totalItems: number;
  boughtItems: number;
  remainingItems: number;
  categoriesCount: Record<string, number>;
  totalEstimatedCost: number;
}

export interface GroceryFilters {
  category: string | null;
  bought: boolean | null;
  search: string;
}

export interface GrocerySort {
  field: keyof GroceryItem;
  order: 'asc' | 'desc';
}

export interface ShareExportOptions {
  includeNotes: boolean;
  includeStats: boolean;
  format: 'text' | 'pdf' | 'csv';
}

export interface GroceryListState {
  items: GroceryItem[];
  notes: string;
  selectedTemplate: Template | null;
  isLoading: boolean;
  showAddForm: boolean;
  searchQuery: string;
  filterCategory: string | null;
  sortBy: 'name' | 'category' | 'createdAt' | 'bought';
  sortOrder: 'asc' | 'desc';
  filters: GroceryFilters;
  sort: GrocerySort;
  shareExportOptions: ShareExportOptions;
} 