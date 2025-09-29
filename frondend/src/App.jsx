import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ProductList from './pages/products/ProductList';
import ProductForm from './pages/products/ProductForm';
import InvoiceList from './pages/invoices/InvoiceList';
import InvoiceForm from './pages/invoices/InvoiceForm';
import InvoiceView from './pages/invoices/InvoiceView';

function App() {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Dashboard />{' '}
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/products"
                    element={
                        <ProtectedRoute>
                            <ProductList />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/products/new"
                    element={
                        <ProtectedRoute>
                            <ProductForm />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/products/:id/edit"
                    element={
                        <ProtectedRoute>
                            <ProductForm />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/invoices"
                    element={
                        <ProtectedRoute>
                            <InvoiceList />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/invoices/new"
                    element={
                        <ProtectedRoute>
                            <InvoiceForm />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/invoices/:id"
                    element={
                        <ProtectedRoute>
                            <InvoiceView />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="*"
                    element={<div className="p-8">Page not found</div>}
                />
            </Routes>
        </>
    );
}

export default App;
