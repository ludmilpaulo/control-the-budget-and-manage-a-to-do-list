# Budget Control and To-Do List Mobile Application

This README provides a prototype overview for a mobile application designed for budget control, financial tracking, and task management. The application includes tracking for income, expenses, debts, and savings alongside a to-do list feature. 

---

## Prototype Screens

### 1. Home Screen
Displays a financial summary and a preview of upcoming tasks.

![Home Screen](images/home_screen.png)

- **Financial Summary**:
  - **Money In**: Shows total income for the current period.
  - **Money Out**: Shows total expenses.
  - **Amount Borrowed**: Displays the total amount borrowed.
  - **Amount Owed**: Displays the amount owed by others.
  - **Amount Saved**: Shows total savings accumulated.
- **Task List**: A preview of upcoming tasks with checkboxes to mark completion.
- **Navigation**: Bottom navigation bar with links to Budget, To-Do List, and Profile screens.

### 2. Budget Screen
Shows expense categories, financial summary, and options to add new expenses.

![Budget Screen](images/budget_screen.png)

- **Category Overview**: Lists categories (e.g., Groceries, Transport) with a progress bar for each category's budget usage.
- **Financial Breakdown**:
  - **Money In** and **Money Out** are highlighted to show the total inflow and outflow for the period.
  - **Amount Saved** is displayed, with a button to add more savings or withdraw from savings.
  - **Amount Borrowed/Owed**: Separate sections that allow users to add new amounts borrowed or owed, with details and due dates.
- **Add Expense Button**: Prominent button to add a new expense.
- **Navigation**: Bottom navigation for quick access to Home, To-Do, and Profile screens.

### 3. Expense Input Screen
A form for entering expense details with an option to categorize and tag transactions.

![Expense Input Screen](images/expense_input_screen.png)

- **Expense Form**:
  - Fields: Category (dropdown), Amount (numeric input), Date (date picker).
  - Type (dropdown): Select from "Expense," "Borrowed," or "Saved."
  - Description (optional): Text area to add additional details.
- **Save Button**: To add the expense to the budget tracker.
- **Cancel Button**: Returns the user to the Budget screen without saving.

### 4. To-Do List Screen
Lists tasks with priority indicators, checkboxes, and due dates.

![To-Do List Screen](images/todo_list_screen.png)

- **Task List**: Displays tasks in a scrollable list.
  - Each task includes: Title, Priority Color Indicator (e.g., High - Red, Medium - Yellow, Low - Green), Due Date.
  - Checkbox to mark tasks as completed.
- **Add Task Button**: For creating a new task with priority and due date.
- **Navigation**: Bottom navigation bar for access to Home, Budget, and Profile screens.

### 5. Profile/Settings Screen
Allows the user to manage profile details, financial settings, and log out.

![Profile Screen](images/profile_screen.png)

- **Profile Details**: Displays user's name and email, with an option to edit.
- **Financial Settings**: Includes settings for preferred currency, budgeting period, and reminders for due dates on debts/owed amounts.
- **Log Out Button**: Safely logs the user out of the application.
- **Navigation**: Bottom bar to return to Home, Budget, or To-Do List.

---

## Navigation Flow

The app uses a bottom navigation bar for seamless movement between primary sections.

- **Home**: Default screen with a financial summary and task overview.
- **Budget**: Detailed view of expenses, income, debt tracking, and savings.
- **To-Do List**: Complete task list with priority sorting.
- **Profile**: User profile, financial settings, and logout option.

---

## UI Design Principles

1. **Color Scheme**: Soft greens and blues for a calming, organized feel.
2. **Typography**: Clear and readable fonts, with headings for organization.
3. **Icons**: Minimal icons for actions like adding or editing items.
4. **Consistency**: Rounded buttons and consistent UI elements across all screens.
5. **Progress Indicators**: Visual indicators (e.g., pie charts and progress bars) to track budget usage, savings, and debts.

---

## Key Features

- **Budget Management**: Track expenses by category, monitor monthly budgets, and adjust spending.
- **Financial Tracking**: Track income (Money In), expenses (Money Out), Amount Borrowed, Amount Owed, and Amount Saved.
- **To-Do List**: Create tasks, set priorities, and mark as complete.
- **User Authentication**: Allows users to securely log in and manage their profiles.
- **Cross-Platform Compatibility**: Designed for mobile usability and accessibility.

---

This enhanced prototype outline, with financial tracking and illustrations, provides a clear visualization of the application's layout and features.
