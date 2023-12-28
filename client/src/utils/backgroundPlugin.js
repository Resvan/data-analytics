const backgroundPlugin = {
    id: 'background',
    beforeDraw: (chart, args, opts) => {
      const { ctx, chartArea } = chart;
      ctx.fillStyle = opts.color;
      ctx.fillRect(chartArea.left, chartArea.top, chartArea.width, chartArea.height);
    }
  }
export default backgroundPlugin;