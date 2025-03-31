import './App.css';
import Clone from './Clone';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
    return (
        <div>
            <QueryClientProvider client={queryClient}>
                <Clone />
            </QueryClientProvider>
        </div>
    );
}

export default App;
