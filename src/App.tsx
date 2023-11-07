import './App.css'
import Circle from "./components/Circle.tsx";
import Bar from "./components/Bar.tsx";

function App() {
    return (
        <>
            <span>Heute</span>
            <Circle percentage={50}/>
            <Bar percentage={60}></Bar>
            <Bar percentage={60}></Bar>
            <Bar percentage={60}></Bar>
        </>
    )
}

export default App
