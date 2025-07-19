# ATPia Version 1 - Streamlined Structure

## 📱 **Core Screens (Version 1)**

### **Authentication Flow**
```
/(auth)/
├── welcome.tsx          ✅ KEEP
├── login.tsx           ✅ KEEP  
├── register.tsx        ✅ KEEP
└── forgot-password.tsx ✅ KEEP
```

### **Main App Flow**
```
/(main)/
├── home.tsx            ✅ KEEP (simplified dashboard)
├── _layout.tsx         ✅ KEEP (simplified navigation)
├── (ai)/
│   ├── _layout.tsx     ✅ KEEP
│   ├── chatbot/
│   │   ├── index.tsx   ✅ KEEP (main chat interface)
│   │   └── (chat)/
│   │       └── [id].tsx ✅ KEEP (individual chat)
│   └── food-scanner/
│       └── food-scanner.tsx ✅ KEEP (food recognition)
├── (tracking)/
│   ├── _layout.tsx     ✅ KEEP
│   ├── tracker.tsx     ✅ KEEP (basic progress tracking)
│   └── habits.tsx      ✅ KEEP (simple habit tracking)
├── (nutrition)/
│   ├── _layout.tsx     ✅ KEEP
│   ├── diet-calculator.tsx ✅ KEEP (core feature)
│   └── meal-plans.tsx  ✅ KEEP (basic meal planning)
└── settings.tsx        ✅ KEEP (basic settings)
```

## 🗂️ **Simplified Tab Structure**

### **Version 1 Tabs:**
1. **AI Chat** 🤖 - Core AI functionality
2. **Food Scanner** 📷 - Camera-based food recognition
3. **Tracking** 📊 - Basic progress & habits
4. **Nutrition** 🍎 - Diet calculator & meal plans
5. **Home** 🏠 - Dashboard overview

### **Removed Tabs:**
- ❌ Social (Forum, Blog, Chat, Testimonials)
- ❌ Advanced features (Analytics, Recipes, Grocery Lists, etc.)

## 📋 **Version 1 Features Breakdown**

### **✅ KEEP (Essential)**
- **AI Chatbot**: Basic chat interface with AI responses
- **Food Scanner**: Camera-based food recognition and nutrition analysis
- **Progress Tracking**: Simple weight/measurement tracking
- **Habit Tracking**: Basic daily habit check-ins
- **Diet Calculator**: BMR/TDEE calculations
- **Meal Plans**: Basic weekly meal suggestions
- **Authentication**: Login/Register flow
- **Settings**: Basic app preferences

### **❌ REMOVE (Version 2+)**
- **Social Features**: Forum, blog, testimonials, community chat
- **Advanced Analytics**: Complex charts and data visualization
- **Recipes**: Recipe database and management
- **Grocery Lists**: Shopping list functionality
- **Avatar System**: Profile customization, FAQ, pricing
- **Advanced Tracking**: Detailed form tracking, complex analytics

## 🎯 **Version 1 User Journey**

1. **Welcome** → User lands on welcome screen
2. **Register/Login** → User creates account or signs in
3. **Home Dashboard** → Overview of key metrics and quick actions
4. **AI Chat** → Get personalized diet advice
5. **Food Scanner** → Scan food for nutrition info
6. **Diet Calculator** → Calculate daily calorie needs
7. **Meal Plans** → Get weekly meal suggestions
8. **Progress Tracking** → Log weight and measurements
9. **Habit Tracking** → Track daily healthy habits

## 📊 **Version 1 Data Structure**

### **User Profile**
- Basic info (name, email, password)
- Height, weight, age, activity level
- Goals (weight loss, maintenance, muscle gain)

### **Tracking Data**
- Weight measurements
- Basic habit completion
- Chat history
- Scanned food items

### **Nutrition Data**
- Calculated BMR/TDEE
- Basic meal plans
- Daily calorie targets
- Food database from scans

## 🚀 **Development Priority**

### **Phase 1 (Week 1-2)**
1. Simplify authentication flow
2. Create basic home dashboard
3. Implement core AI chat functionality
4. Implement food scanner

### **Phase 2 (Week 3-4)**
1. Build diet calculator
2. Create basic meal plans
3. Implement simple progress tracking

### **Phase 3 (Week 5-6)**
1. Add habit tracking
2. Polish UI/UX
3. Testing and bug fixes

## 💡 **Benefits of This Approach**

1. **Faster Development**: Fewer features = quicker MVP
2. **Easier Testing**: Simpler codebase = fewer bugs
3. **Clear Focus**: Core diet functionality without distractions
4. **User Clarity**: Simple, focused user experience
5. **Scalable**: Easy to add features in future versions
6. **AI-Powered**: Both chat and food scanner leverage AI

## 🔄 **Migration Strategy**

1. **Backup current codebase**
2. **Create new simplified structure**
3. **Copy essential components**
4. **Remove unused features**
5. **Update navigation and routing**
6. **Test core functionality**
7. **Deploy Version 1**

## 📈 **Future Version Roadmap**

### **Version 2 (3-6 months)**
- Social features (forum, blog)
- Advanced analytics
- Recipe database
- Grocery lists

### **Version 3 (6-12 months)**
- Advanced meal planning
- Community features
- Premium features
- Advanced food recognition

This streamlined approach will get you to market faster with a focused, high-quality product that delivers the core value proposition: AI-powered personalized diet advice with food scanning and basic tracking and nutrition planning. 