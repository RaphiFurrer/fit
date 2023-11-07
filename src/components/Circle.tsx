const Circle = ({percentage}: { percentage: number }) => {
    const radius = 150; // Radius of the circle
    const strokeWidth = 30; // Width of the progress bar
    const normalizedRadius = radius - strokeWidth * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <>
            <svg height={radius * 2} width={radius * 2} className="mx-auto">
                <circle
                    fill="transparent"
                    stroke="lightgray"
                    strokeWidth={strokeWidth}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <circle
                    fill="transparent"
                    stroke="#00008f"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{strokeDashoffset}}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    transform={`rotate(-90 ${radius} ${radius})`} // Rotate the progress 90 degrees counterclockwise
                />
                <text
                    x={radius}
                    y={radius}
                    fontSize="18"
                    className="text-teal text-center"
                    dominantBaseline="middle"
                    textAnchor="middle"
                >
                    {percentage}%
                </text>
            </svg>
        </>
    )
}

export default Circle;