# Fable — Ebook Sharing Platform

A digital platform connecting ebook lovers, readers, and collectors with talented writers. The platform allows users to browse, discover, and read original ebooks. Writers can upload and manage their creations, while an admin oversees the entire system.

## Live URL

[https://fable-client-theta.vercel.app](https://fable-client-theta.vercel.app)

## GitHub Repositories

- Client: [https://github.com/Mohammadsajibulislam/fable-client](https://github.com/Mohammadsajibulislam/fable-client)
- Server: [https://github.com/Mohammadsajibulislam/fable-server](https://github.com/Mohammadsajibulislam/fable-server)

## Key Features

### General

- Dark green themed responsive design
- Role-based authentication — Reader, Writer, Admin
- JWT token based API security
- Server-side pagination, search and filtering
- Toast notifications for user feedback
- Custom 404, Error and Loading pages

### Reader (User)

- Browse, search, filter and sort ebooks by genre, price, availability
- View ebook details with full information
- Purchase ebooks via Stripe payment
- Bookmark ebooks for later
- Purchase history and reading library
- Profile management

### Writer

- Upload and manage ebooks with ImgBB image hosting
- Publish/unpublish ebooks
- Edit and delete ebooks
- Sales history tracking
- Bookmark ebooks
- Profile management

### Admin

- Manage all users (change roles, delete)
- Manage all ebooks (publish/unpublish, delete)
- View all transactions
- Analytics dashboard with Recharts (Bar chart, Pie chart)
- Platform statistics overview

## npm Packages Used

| Package                       | Purpose          |
| ----------------------------- | ---------------- |
| next                          | React framework  |
| react, react-dom              | UI library       |
| better-auth                   | Authentication   |
| mongodb                       | Database         |
| stripe, @stripe/stripe-js     | Payment gateway  |
| motion                        | Animations       |
| recharts                      | Dashboard charts |
| react-icons                   | Icon library     |
| lucide-react                  | Additional icons |
| tailwindcss                   | CSS framework    |
| @heroui/react, @heroui/styles | UI components    |

## Environment Variables

```env
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
MONGODB_URI=
AUTH_DB_NAME=
NEXT_PUBLIC_BASE_URL=
NEXT_PUBLIC_IMGBB_API_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```
