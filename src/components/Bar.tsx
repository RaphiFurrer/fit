const Bar = ({ percentage }: { percentage: number }) => {
  const barWidth = 300; // Width of the progress bar
  const barHeight = 30; // Height of the progress bar
  const fillWidth = (percentage / 100) * barWidth;

  return (
    <div className="w-full mx-auto">
      {/* Border Bar */}
      <div
        className="bg-gray-300"
        style={{
          width: barWidth + 'px',
          height: barHeight + 'px',
        }}
      >
        {/* Fill Bar */}
        <div
          className={percentage === 100 ? 'bg-[#9fbeaf]' : 'bg-[#00008f]'}
          style={{
            width: fillWidth + 'px',
            height: barHeight + 'px',
          }}
        ></div>
      </div>
      <div className="text-teal text-center mt-2">{percentage}%</div>
    </div>
  );
};

export default Bar;
