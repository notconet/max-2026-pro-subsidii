import { RouterProvider } from '@tanstack/react-router';
import { useState } from 'react';
import { router } from './router';
import styles from './components/SplashScreen.module.css';

const App = () => {
    const [showSplash, setShowSplash] = useState(true);

    return (
        <>
            <RouterProvider router={router} />
            {showSplash && (
                <div
                    className={styles.splash}
                    aria-hidden="true"
                    onAnimationEnd={(event) => {
                        if (event.animationName === 'splash-dismiss') {
                            setShowSplash(false);
                        }
                    }}
                >
                    <div className={styles.content}>
                        <img
                            className={styles.logo}
                            src="/favicon.png"
                            alt=""
                        />
                        <p className={styles.title}>ПРО Субсидии</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default App;
