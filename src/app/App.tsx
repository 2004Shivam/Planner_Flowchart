import { ThemeProvider } from 'next-themes';
import { ExecutionFlowchart } from './components/ExecutionFlowchart';

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <div className="w-full h-screen">
        <ExecutionFlowchart />
      </div>
    </ThemeProvider>
  );
}
