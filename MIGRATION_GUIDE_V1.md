# 🚀 ATPia Version 1 Migration Guide

## 📋 **Pre-Migration Checklist**

### **Backup Current Codebase**
```bash
# Create a backup branch
git checkout -b backup-full-version
git push origin backup-full-version

# Create a new branch for Version 1
git checkout -b version-1-simplified
```

## 🔄 **Step-by-Step Migration**

### **Step 1: Update Tab Structure**
1. Replace `shared/data/tabItems.ts` with `shared/data/tabItems-v1.ts`
2. Update imports in `app/(main)/_layout.tsx`

### **Step 2: Simplify Main Layout**
1. Replace current `app/(main)/_layout.tsx` with `app/(main)/_layout-v1.tsx`
2. Remove complex dropdown components
3. Simplify navigation logic

### **Step 3: Update Home Screen**
1. Replace `features/home/screens/HomeScreen.tsx` with `HomeScreenV1.tsx`
2. Remove social features from home screen
3. Keep only essential AI, nutrition, and tracking features

### **Step 4: Remove Unused Directories**

#### **Delete These Directories:**
```bash
# Remove social features
rm -rf app/(main)/(social)
rm -rf features/social

# Remove avatar features
rm -rf app/(main)/(avatar)
rm -rf features/avatar

# Remove food scanner
rm -rf app/(main)/(ai)/food-scanner
rm -rf features/ai/food-scanner

# Remove advanced tracking
rm -rf app/(main)/(tracking)/analytics.tsx
rm -rf app/(main)/(tracking)/form.tsx
rm -rf features/trackings/analytics
rm -rf features/trackings/form

# Remove advanced nutrition
rm -rf app/(main)/(nutration)/recipes.tsx
rm -rf app/(main)/(nutration)/grocery-list.tsx
rm -rf features/nutration/recipes
rm -rf features/nutration/grocery-list
rm -rf features/nutration/meal-plans

# Remove complex components
rm -rf features/settings
rm -rf features/menu
rm -rf features/notifications
```

### **Step 5: Update Navigation Routes**

#### **Update `app/(main)/_layout.tsx`:**
```typescript
// Simplified tab routes
const tabRoutes = {
  ai: "/(main)/(ai)/chatbot",
  tracking: "/(main)/(tracking)/tracker",
  nutrition: "/(main)/(nutrition)/diet-calculator",
  home: "/(main)/home",
} as const;
```

### **Step 6: Simplify AI Features**

#### **Keep Only:**
- `app/(main)/(ai)/chatbot/` - Core chat functionality
- Basic chat interface
- Chat history
- AI responses

#### **Remove:**
- Food scanner
- Library/Explore sections (if not essential)

### **Step 7: Simplify Tracking Features**

#### **Keep Only:**
- `app/(main)/(tracking)/tracker.tsx` - Basic progress tracking
- `app/(main)/(tracking)/habits.tsx` - Simple habit tracking

#### **Remove:**
- Analytics (complex charts)
- Form tracking
- Advanced data visualization

### **Step 8: Simplify Nutrition Features**

#### **Keep Only:**
- `app/(main)/(nutrition)/diet-calculator.tsx` - Core calculator
- `app/(main)/(nutrition)/meal-plans.tsx` - Basic meal plans

#### **Remove:**
- Recipes database
- Grocery lists
- Advanced meal planning

### **Step 9: Update Component Imports**

#### **Remove Unused Imports:**
```typescript
// Remove these imports from _layout.tsx
import { SettingsDropdown } from "@/features/settings/components";
import { useSettingsDropdown } from "@/features/settings/hooks";
import { AvatarDropdown } from "@/features/avatar/main/components";
import { useAvatarDropdown } from "@/features/avatar/main/hooks";
import { MenuDropdown } from "@/features/menu/components";
import { useMenuDropdown } from "@/features/menu/hooks";
import { NotificationsDropdown } from "@/features/notifications/components";
import { useNotificationsDropdown } from "@/features/notifications/hooks";
```

### **Step 10: Update Package Dependencies**

#### **Remove Unused Dependencies:**
```bash
# Remove camera-related packages (if used for food scanner)
npm uninstall expo-camera expo-media-library

# Remove chart libraries (if used for analytics)
npm uninstall react-native-chart-kit victory-native

# Remove social media packages (if any)
npm uninstall react-native-share
```

## 🧪 **Testing Checklist**

### **Core Functionality Tests:**
- [ ] Authentication flow works
- [ ] AI chat functionality works
- [ ] Diet calculator calculates correctly
- [ ] Basic progress tracking works
- [ ] Habit tracking works
- [ ] Navigation between tabs works
- [ ] Home screen displays correctly

### **UI/UX Tests:**
- [ ] All screens render without errors
- [ ] Navigation is smooth
- [ ] No broken links or missing components
- [ ] Responsive design works on different screen sizes

### **Performance Tests:**
- [ ] App loads quickly
- [ ] No memory leaks
- [ ] Smooth animations
- [ ] Efficient data handling

## 🚀 **Deployment Steps**

### **1. Final Testing**
```bash
# Run tests
npm test

# Build for production
expo build:android
expo build:ios
```

### **2. Update App Store Metadata**
- Update app description to reflect Version 1 features
- Remove mentions of social features
- Focus on AI-powered diet advice

### **3. Deploy**
```bash
# Deploy to app stores
expo publish
```

## 📊 **Version 1 Metrics to Track**

### **User Engagement:**
- Daily active users
- Time spent in AI chat
- Diet calculator usage
- Progress tracking completion rate

### **Performance:**
- App crash rate
- Load times
- User retention rate

### **Feature Usage:**
- Most used features
- Feature completion rates
- User feedback scores

## 🔄 **Rollback Plan**

If issues arise, you can quickly rollback:

```bash
# Switch back to full version
git checkout backup-full-version

# Or create a new branch from backup
git checkout -b version-1-fix backup-full-version
```

## 📈 **Post-Launch Monitoring**

### **Week 1:**
- Monitor crash reports
- Check user feedback
- Track core feature usage

### **Week 2-4:**
- Analyze user behavior patterns
- Identify most/least used features
- Plan Version 2 features based on data

### **Month 2:**
- Start planning Version 2 features
- Prioritize based on user feedback
- Begin development of new features

## 💡 **Success Criteria for Version 1**

- [ ] App launches without errors
- [ ] Core features work reliably
- [ ] User retention rate > 60%
- [ ] Positive app store reviews
- [ ] No critical bugs reported
- [ ] Performance meets expectations

This migration will give you a focused, high-quality MVP that delivers the core value proposition while being much easier to maintain and develop. 