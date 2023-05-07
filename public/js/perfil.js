const ctx = document.getElementById('myChart');
const plugin = {
    id: 'myChart',
    beforeDraw: (chart, args, options) => {
        const {ctx} = chart;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = options.color || '#ffffff';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
    }
};
new Chart(ctx, {
    type: 'line',
    data: {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    datasets: [{
        label: 'Atividade da semana',
        data: [12, 19, 3, 5, 2, 3, 1],
        borderWidth: 1,
        borderColor: '#000000',
        backgroundColor: '#000000',
    }]
    },
    options: {
    plugins: {
        legend: {
            display: true,
            labels: {
                color: '#000000',
                // font: {
                //     size: 15
                // }
            },
        }
    },
},
plugins: [plugin],
});
