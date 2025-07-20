import { useState } from 'react';

export const useMenuDropdown = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => setIsDropdownVisible((v) => !v);
  const closeDropdown = () => setIsDropdownVisible(false);

  return {
    isDropdownVisible,
    toggleDropdown,
    closeDropdown,
  };
}; 