import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { 
  GroceryItem, 
  Category, 
  Template, 
  SmartSuggestion,
  AddItemForm,
  GroceryListState,
  GroceryFilters,
  GrocerySort,
  ShareExportOptions,
  ListStats,
  ChartData
} from '../types';
import { GroceryService } from '../services/groceryService';

interface GroceryStore extends GroceryListState {
  // Actions
  addItem: (form: AddItemForm) => void;
  updateItem: (id: number, updates: Partial<GroceryItem>) => void;
  toggleItemBought: (id: number) => void;
  deleteItem: (id: number) => void;
  addItemsFromTemplate: (template: Template) => void;
  setNotes: (notes: string) => void;
  setSelectedTemplate: (template: Template | null) => void;
  setShowAddForm: (show: boolean) => void;
  setSearchQuery: (query: string) => void;
  setFilterCategory: (category: string | null) => void;
  setSortBy: (field: 'name' | 'category' | 'createdAt' | 'bought') => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
  setFilters: (filters: Partial<GroceryFilters>) => void;
  setSort: (sort: GrocerySort) => void;
  setShareExportOptions: (options: Partial<ShareExportOptions>) => void;
  resetList: () => void;
  clearCompleted: () => void;
  addSmartSuggestion: (suggestion: SmartSuggestion) => void;
}

const initialState: GroceryListState = {
  items: GroceryService.DEMO_ITEMS,
  notes: '',
  selectedTemplate: null,
  isLoading: false,
  showAddForm: false,
  searchQuery: '',
  filterCategory: null,
  sortBy: 'name',
  sortOrder: 'asc',
  filters: {
    category: null,
    bought: null,
    search: ''
  },
  sort: {
    field: 'name',
    order: 'asc'
  },
  shareExportOptions: {
    includeNotes: true,
    includeStats: true,
    format: 'text'
  }
};

export const useGroceryStore = create<GroceryStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      // Actions
      addItem: (form: AddItemForm) => {
        const validation = GroceryService.validateItemForm(form);
        if (!validation.isValid) {
          console.error('Form validation failed:', validation.errors);
          return;
        }

        const newItem = GroceryService.createItem(form);
        set((state) => ({
          items: [...state.items, newItem],
          showAddForm: false
        }));
      },

      updateItem: (id: number, updates: Partial<GroceryItem>) => {
        set((state) => ({
          items: state.items.map(item =>
            item.id === id ? GroceryService.updateItem(item, updates) : item
          )
        }));
      },

      toggleItemBought: (id: number) => {
        set((state) => ({
          items: state.items.map(item =>
            item.id === id ? GroceryService.toggleBought(item) : item
          )
        }));
      },

      deleteItem: (id: number) => {
        set((state) => ({
          items: GroceryService.deleteItem(state.items, id)
        }));
      },

      addItemsFromTemplate: (template: Template) => {
        const newItems = GroceryService.addItemsFromTemplate(template);
        set((state) => ({
          items: [...state.items, ...newItems],
          selectedTemplate: template
        }));
      },

      setNotes: (notes: string) => {
        set({ notes });
      },

      setSelectedTemplate: (template: Template | null) => {
        set({ selectedTemplate: template });
      },

      setShowAddForm: (show: boolean) => {
        set({ showAddForm: show });
      },

      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
      },

      setFilterCategory: (category: string | null) => {
        set({ filterCategory: category });
      },

      setSortBy: (field: 'name' | 'category' | 'createdAt' | 'bought') => {
        set({ sortBy: field });
      },

      setSortOrder: (order: 'asc' | 'desc') => {
        set({ sortOrder: order });
      },

      setFilters: (filters: Partial<GroceryFilters>) => {
        set((state) => ({
          filters: { ...state.filters, ...filters }
        }));
      },

      setSort: (sort: GrocerySort) => {
        set({ sort });
      },

      setShareExportOptions: (options: Partial<ShareExportOptions>) => {
        set((state) => ({
          shareExportOptions: { ...state.shareExportOptions, ...options }
        }));
      },

      resetList: () => {
        set(initialState);
      },

      clearCompleted: () => {
        set((state) => ({
          items: state.items.filter(item => !item.bought)
        }));
      },

      addSmartSuggestion: (suggestion: SmartSuggestion) => {
        const form: AddItemForm = {
          name: suggestion.name,
          qty: '1',
          category: suggestion.category
        };
        get().addItem(form);
      }
    }),
    {
      name: 'grocery-store',
      enabled: __DEV__
    }
  )
);

// Selector hooks - only basic selectors to prevent infinite loops
export const useGroceryItems = () => useGroceryStore((state) => state.items);
export const useGroceryNotes = () => useGroceryStore((state) => state.notes);
export const useGroceryCategories = () => useGroceryStore((state) => GroceryService.CATEGORIES);
export const useGroceryTemplates = () => useGroceryStore((state) => GroceryService.TEMPLATES); 