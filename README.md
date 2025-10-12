# CashMind - Budget Control and To-Do List Mobile Application

A comprehensive mobile application for budget control, financial tracking, and task management built with React Native (Expo) and Django REST Framework.

## Features

### Financial Management
- **Income & Expense Tracking**: Monitor all your financial transactions
- **Category-based Budgeting**: Set budget limits for different expense categories
- **Debt Management**: Track money borrowed and owed
- **Savings Tracker**: Keep track of your savings goals
- **Financial Summary Dashboard**: Get a quick overview of your finances

### Task Management
- **Priority-based Tasks**: Organize tasks by low, medium, or high priority
- **Due Dates**: Set and track task deadlines
- **Task Completion**: Mark tasks as complete with a simple tap
- **Task Descriptions**: Add detailed notes to your tasks

### User Interface
- **Modern Design**: Clean, intuitive interface with material design principles
- **Color-coded Categories**: Visual indicators for budget categories and task priorities
- **Progress Tracking**: Visual progress bars for budget usage
- **Pull-to-Refresh**: Easy data synchronization
- **Cross-platform**: Works on iOS, Android, and Web

## Technology Stack

### Frontend
- React Native with Expo
- TypeScript
- Expo Router for navigation
- Native components for optimal performance

### Backend
- Django 4.2
- Django REST Framework
- SQLite database
- CORS enabled for mobile access

## Project Structure

```
control-the-budget-and-manage-a-to-do-list/
├── CashMindApp/              # React Native mobile app
│   ├── app/                  # App screens and navigation
│   │   └── (tabs)/           # Tab-based navigation
│   │       ├── index.tsx     # Home screen
│   │       ├── budget.tsx    # Budget management screen
│   │       ├── todo.tsx      # Task management screen
│   │       └── profile.tsx   # User profile screen
│   ├── components/           # Reusable UI components
│   ├── services/             # API services
│   │   └── api.ts            # API client functions
│   └── constants/            # App constants and themes
│
└── budjet/                   # Django backend
    ├── budjet/               # Project settings
    │   ├── settings.py       # Django configuration
    │   └── urls.py           # URL routing
    └── managment/            # Main app
        ├── models.py         # Database models
        ├── views.py          # API views
        ├── serializers.py    # DRF serializers
        └── admin.py          # Admin interface
```

## Installation & Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd budjet
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

5. Create a superuser (for admin access):
```bash
python manage.py createsuperuser
```

6. Create some initial categories (optional):
```bash
python manage.py shell
```
```python
from managment.models import Category
Category.objects.create(name="Groceries", budget_limit=500.00, color="#4CAF50")
Category.objects.create(name="Transport", budget_limit=200.00, color="#2196F3")
Category.objects.create(name="Entertainment", budget_limit=150.00, color="#FF9800")
Category.objects.create(name="Utilities", budget_limit=300.00, color="#9C27B0")
exit()
```

7. Start the development server:
```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000/api/`

### Frontend Setup

1. Navigate to the mobile app directory:
```bash
cd CashMindApp
```

2. Install dependencies:
```bash
npm install
```

3. Start the Expo development server:
```bash
npm start
```

4. Run on your preferred platform:
```bash
npm run android  # For Android
npm run ios      # For iOS
npm run web      # For Web
```

## API Endpoints

### Financial Endpoints
- `GET /api/financial-summary/` - Get overall financial summary
- `GET /api/category-expenses/` - Get expenses by category with progress
- `GET /api/incomes/` - List all income entries
- `POST /api/incomes/` - Create new income entry
- `GET /api/expenses/` - List all expenses
- `POST /api/expenses/` - Create new expense
- `GET /api/debts/` - List all debts
- `POST /api/debts/` - Create new debt entry
- `GET /api/savings/` - List all savings
- `POST /api/savings/` - Create new savings entry

### Task Endpoints
- `GET /api/tasks/` - List all tasks
- `POST /api/tasks/` - Create new task
- `PATCH /api/tasks/{id}/` - Update task
- `DELETE /api/tasks/{id}/` - Delete task

### Category Endpoints
- `GET /api/categories/` - List all categories
- `POST /api/categories/` - Create new category

## Database Models

### Category
- name: Category name
- budget_limit: Maximum budget for this category
- color: Color code for visual representation

### Income
- amount: Income amount
- description: Income description
- date: Date of income
- user: Associated user (optional)

### Expense
- amount: Expense amount
- description: Expense description
- category: Category (optional)
- expense_type: Type (expense, borrowed, saved)
- date: Date of expense
- user: Associated user (optional)

### Debt
- amount: Debt amount
- description: Debt description
- debt_type: Type (borrowed, owed)
- due_date: Payment due date (optional)
- is_paid: Payment status
- user: Associated user (optional)

### Task
- title: Task title
- description: Task description
- priority: Priority level (low, medium, high)
- due_date: Task deadline (optional)
- completed: Completion status
- user: Associated user (optional)

## Features in Detail

### Home Screen
- Financial summary cards showing:
  - Money In (total income)
  - Money Out (total expenses)
  - Amount Borrowed
  - Amount Owed to you
  - Amount Saved
- Quick preview of upcoming tasks
- Pull-to-refresh functionality

### Budget Screen
- Financial overview cards
- Category-wise expense tracking
- Visual progress bars for budget usage
- Color-coded budget status
- Add new expense functionality

### To-Do List Screen
- Separate sections for pending and completed tasks
- Priority indicators (color-coded)
- Due date tracking
- Task completion toggle
- Delete task functionality
- Add new task with priority and due date

### Profile Screen
- User profile information
- Financial settings (currency, budget period)
- App settings (theme, language)
- Logout functionality

## Development

### Adding New Categories
Use Django admin panel at `http://localhost:8000/admin/` to add categories with custom colors and budget limits.

### Customizing the App
- Colors and themes: `CashMindApp/constants/Colors.ts`
- API base URL: `CashMindApp/services/api.ts`
- Backend settings: `budjet/budjet/settings.py`

## Testing

### Backend Testing
```bash
cd budjet
python manage.py test
```

### Frontend Testing
```bash
cd CashMindApp
npm test
```

## Production Deployment

### Backend
1. Update `DEBUG = False` in settings.py
2. Set proper `ALLOWED_HOSTS`
3. Configure production database (PostgreSQL recommended)
4. Set up proper SECRET_KEY
5. Configure static files
6. Use gunicorn or uwsgi
7. Set up nginx as reverse proxy

### Frontend
1. Update API_BASE_URL in `services/api.ts`
2. Build for production:
```bash
expo build:android
expo build:ios
```

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
MIT License

## Support
For issues and questions, please open an issue on GitHub.

## Screenshots

### Home Screen
- Financial summary dashboard
- Upcoming tasks preview

### Budget Screen
- Category-wise budget tracking
- Visual progress indicators
- Add expense functionality

### To-Do List Screen
- Task management with priorities
- Due date tracking
- Task completion

### Profile Screen
- User settings
- Financial preferences
- App configuration

---

Built with ❤️ using React Native and Django
