import { useCallback, useMemo } from 'react';
import { 
  useGroceryStore,
  useGroceryItems,
  useGroceryNotes,
  useGroceryCategories,
  useGroceryTemplates
} from '../stores/groceryStore';
import { AddItemForm, GroceryItem, Template, SmartSuggestion } from '../types';
import { GroceryService } from '../services/groceryService';

export const useGrocery = () => {
  // Basic state selectors - these are safe
  const items = useGroceryItems();
  const notes = useGroceryNotes();
  const categories = useGroceryCategories();
  const templates = useGroceryTemplates();

  // Get additional state using selectors to prevent infinite loops
  const showAddForm = useGroceryStore((state) => state.showAddForm);
  const selectedTemplate = useGroceryStore((state) => state.selectedTemplate);
  const searchQuery = useGroceryStore((state) => state.searchQuery);
  const filterCategory = useGroceryStore((state) => state.filterCategory);
  const sortBy = useGroceryStore((state) => state.sortBy);
  const sortOrder = useGroceryStore((state) => state.sortOrder);
  const filters = useGroceryStore((state) => state.filters);
  const sort = useGroceryStore((state) => state.sort);
  const shareExportOptions = useGroceryStore((state) => state.shareExportOptions);
  const isLoading = useGroceryStore((state) => state.isLoading);

  // Computed values using useMemo to prevent infinite loops
  const stats = useMemo(() => {
    const totalItems = items?.length || 0;
    const boughtItems = items?.filter(item => item.bought).length || 0;
    const remainingItems = totalItems - boughtItems;
    const totalEstimatedCost = totalItems * 3.50;
    return { totalItems, boughtItems, remainingItems, totalEstimatedCost };
  }, [items]);

  const chartData = useMemo(() => {
    if (!items || items.length === 0) return [];
    
    const categoryCounts: Record<string, number> = {};
    items.forEach(item => {
      categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
    });
    const total = items.length;
    return Object.entries(categoryCounts).map(([category, count]) => ({
      name: category,
      value: count,
      color: '#10B981',
      percentage: total > 0 ? Math.round((count / total) * 100) : 0
    }));
  }, [items]);

  const smartSuggestions = useMemo(() => {
    const existingItems = items.map(item => item.name.toLowerCase());
    return GroceryService.SMART_SUGGESTIONS
      .filter(suggestion => !existingItems.includes(suggestion.name.toLowerCase()))
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 6);
  }, [items]);

  const filteredItems = useMemo(() => {
    if (!items) return [];
    
    let filtered = items;
    
    if (filters?.category) {
      filtered = filtered.filter(item => item.category === filters.category);
    }
    if (filters?.bought !== null && filters?.bought !== undefined) {
      filtered = filtered.filter(item => item.bought === filters.bought);
    }
    if (filters?.search) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    return filtered.sort((a, b) => {
      const aValue = a[sort?.field || 'name'];
      const bValue = b[sort?.field || 'name'];
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return (sort?.order || 'asc') === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      if (aValue < bValue) return (sort?.order || 'asc') === 'asc' ? -1 : 1;
      if (aValue > bValue) return (sort?.order || 'asc') === 'asc' ? 1 : -1;
      return 0;
    });
  }, [items, filters, sort]);

  // Actions with memoization
  const addItem = useCallback((form: AddItemForm) => {
    useGroceryStore.getState().addItem(form);
  }, []);

  const updateItem = useCallback((id: number, updates: Partial<GroceryItem>) => {
    useGroceryStore.getState().updateItem(id, updates);
  }, []);

  const toggleItemBought = useCallback((id: number) => {
    useGroceryStore.getState().toggleItemBought(id);
  }, []);

  const deleteItem = useCallback((id: number) => {
    useGroceryStore.getState().deleteItem(id);
  }, []);

  const addItemsFromTemplate = useCallback((template: Template) => {
    useGroceryStore.getState().addItemsFromTemplate(template);
  }, []);

  const setNotes = useCallback((notes: string) => {
    useGroceryStore.getState().setNotes(notes);
  }, []);

  const setSelectedTemplate = useCallback((template: Template | null) => {
    useGroceryStore.getState().setSelectedTemplate(template);
  }, []);

  const setShowAddForm = useCallback((show: boolean) => {
    useGroceryStore.getState().setShowAddForm(show);
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    useGroceryStore.getState().setSearchQuery(query);
  }, []);

  const setFilterCategory = useCallback((category: string | null) => {
    useGroceryStore.getState().setFilterCategory(category);
  }, []);

  const setSortBy = useCallback((field: 'name' | 'category' | 'createdAt' | 'bought') => {
    useGroceryStore.getState().setSortBy(field);
  }, []);

  const setSortOrder = useCallback((order: 'asc' | 'desc') => {
    useGroceryStore.getState().setSortOrder(order);
  }, []);

  const setFilters = useCallback((filters: { category?: string; bought?: boolean; search?: string }) => {
    useGroceryStore.getState().setFilters(filters);
  }, []);

  const setSort = useCallback((sort: { field: keyof GroceryItem; order: 'asc' | 'desc' }) => {
    useGroceryStore.getState().setSort(sort);
  }, []);

  const setShareExportOptions = useCallback((options: { includeNotes?: boolean; includeStats?: boolean; format?: 'text' | 'pdf' | 'csv' }) => {
    useGroceryStore.getState().setShareExportOptions(options);
  }, []);

  const resetList = useCallback(() => {
    useGroceryStore.getState().resetList();
  }, []);

  const clearCompleted = useCallback(() => {
    useGroceryStore.getState().clearCompleted();
  }, []);

  const addSmartSuggestion = useCallback((suggestion: SmartSuggestion) => {
    useGroceryStore.getState().addSmartSuggestion(suggestion);
  }, []);
  
  return {
    // State
    items,
    notes,
    stats,
    chartData,
    categories,
    templates,
    smartSuggestions,
    filteredItems,
    showAddForm,
    selectedTemplate,
    searchQuery,
    filterCategory,
    sortBy,
    sortOrder,
    filters,
    sort,
    shareExportOptions,
    isLoading,

    // Actions
    addItem,
    updateItem,
    toggleItemBought,
    deleteItem,
    addItemsFromTemplate,
    setNotes,
    setSelectedTemplate,
    setShowAddForm,
    setSearchQuery,
    setFilterCategory,
    setSortBy,
    setSortOrder,
    setFilters,
    setSort,
    setShareExportOptions,
    resetList,
    clearCompleted,
    addSmartSuggestion
  };
}; 