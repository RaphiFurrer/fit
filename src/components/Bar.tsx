const Bar = ({ percentage }: {percentage: number}) => {
    const barWidth = 200; // Width of the progress bar
    const barHeight = 20; // Height of the progress bar
    const borderStrokeWidth = 2; // Width of the border
    const normalizedWidth = barWidth - borderStrokeWidth * 2; // Adjust for the border
    const fillWidth = (percentage / 100) * normalizedWidth;

    return (
        <div className="w-full mx-auto">
            {/* Border Bar */}
            <div
                className="bg-teal-100 border border-teal-500"
                style={{
                    width: barWidth + 'px',
                    height: barHeight + 'px',
                }}
            >
                {/* Fill Bar */}
                <div
                    className="bg-teal-500"
                    style={{
                        width: fillWidth + 'px',
                        height: barHeight + 'px',
                    }}
                ></div>
            </div>
            <div className="text-teal text-center mt-2">
                {percentage}%
            </div>
        </div>
    );
};

export default Bar;