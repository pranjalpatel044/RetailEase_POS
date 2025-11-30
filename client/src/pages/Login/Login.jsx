import toast from 'react-hot-toast';
import './Login.css';
import { login } from '../../service/AuthService.js';
import { AppContext } from '../../context/AppContext.jsx';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const { setAuthData } = useContext(AppContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const onChangeHandler = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
           const response = await login(data);
            if (response.status === 200) {
                toast.success('Login successful!');
                
              localStorage.setItem('token', response.data.token); 
              localStorage.setItem('role', response.data.role);
              setAuthData(response.data.token, response.data.role);
              
              console.log("Saved token:", response.data.token);
                console.log("Saved role:", response.data.role);
              
              navigate('/dashboard'); // Redirect to the dashboard after successful login

            } else {
                toast.error('Login failed. Please check your credentials and try again.');
            }
        } catch (error) {
            toast.error('Login failed. Please check your credentials and try again.'); 
            console.error('Login error:', error);        
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-light d-flex align-items-center justify-content-center vh-100 login-background">
            <div className="card shadow-lg w-100" style={{ maxWidth: '480px' }}>
                <div className="card-body">
                    <div className="text-center">
                        <h1 className="card-title">Sign in</h1>
                        <p className="card-text text-muted">
                            Sign in below to access your account.
                        </p>
                    </div>

                    <div className="mt4">
                        <form onSubmit={onSubmitHandler}>
                            <div className="mb-4">
                                <label htmlFor="email" className="form-label text-muted">Email address</label>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    placeholder="yourname@example.com"
                                    className="form-control"
                                    onChange={onChangeHandler}
                                    value={data.email}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="password" className="form-label text-muted">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="*******"
                                    className="form-control"
                                    onChange={onChangeHandler}
                                    value={data.password}
                                />
                            </div>

                            <div className="d-grid">
                                <button type="submit" className="btn btn-dark btn-lg" disabled={loading}>
                                    {loading ? 'Loading...' : 'Sign in'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
