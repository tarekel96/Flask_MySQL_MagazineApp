import React from 'react';
import {
	AnimatedAxis, // any of these can be non-animated equivalents
	AnimatedGrid,
	AnimatedBarSeries,
	XYChart,
	Tooltip,
	buildChartTheme,
	DataContext
} from '@visx/xychart';
import { Axis } from '@visx/axis';
import { AnimatedAxis as AnAxis } from '@visx/react-spring';
import { scaleLinear } from '@visx/scale';

const accessors = {
	xAccessor: (d) => d.x,
	yAccessor: (d) => d.y
};

const customTheme = buildChartTheme({
	// colors
	colors: [ '#20df7f', '#aef' ], // categorical colors, mapped to series via `dataKey`s
	backgroundColor: 'white',
	// labels
	// svgLabelBig?: SVGTextProps;
	// svgLabelSmall?: SVGTextProps;
	// htmlLabel?: HTMLTextStyles;

	// // lines
	// xAxisLineStyles?: LineStyles;
	// yAxisLineStyles?: LineStyles;
	// xTickLineStyles: { className: "ticks" }
	// yTickLineStyles?: LineStyles;
	tickLength: 4,

	// // grid
	gridColor: 'lightgrey',
	gridColorDark: 'black' // used for axis baseline if x/yxAxisLineStyles not set
	// gridStyles?: CSSProperties;
});

const DEFAULT_DATA = [
	{ x: new Date('1/01/2019'), y: 30 },
	{ x: new Date('2/01/2019'), y: 40 },
	{ x: new Date('1/01/2020'), y: 40 },
	{ x: new Date('2/01/2021'), y: 80 },
	{ x: new Date('5/01/2021'), y: 50 },
	{ x: new Date('2/01/2022'), y: 20 }
];

const DEFAULT_TICKS = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

export const Graph = (data = DEFAULT_DATA, labels = DEFAULT_TICKS) => {
	const Ax = () => {
		return (
			<AnimatedAxis
				tickLabelProps={() => ({
					fontSize: 11,
					textAnchor: 'middle',
					dy: '4'
				})}
				tickTransform="translate(0,7)"
				orientation="bottom"
				tickFormat={(_, i) => `${DEFAULT_TICKS[i]}`}
			/>
		);
	};
	return (
		<XYChart
			theme={customTheme}
			height={500}
			xScale={{ type: 'band', paddingInner: 0.5 }}
			yScale={{ type: 'linear' }}
		>
			{/* <Ax /> */}
			<AnimatedAxis hideAxisLine={true} hideTicks={true} orientation="left" />
			<AnimatedGrid rows={true} columns={false} numTicks={16} />
			<AnimatedBarSeries dataKey="Line 2" data={DEFAULT_DATA} {...accessors} />

			<Tooltip
				// snapTooltipToDatumX
				// snapTooltipToDatumY
				// showVerticalCrosshair
				// showSeriesGlyphs
				renderTooltip={({ tooltipData, colorScale }) => (
					<div>
						<div style={{ color: colorScale(tooltipData.nearestDatum.key) }}>
							{tooltipData.nearestDatum.key}
						</div>
						{accessors.xAccessor(tooltipData.nearestDatum.datum).toString()}
						{', '}
						{accessors.yAccessor(tooltipData.nearestDatum.datum)}
					</div>
				)}
			/>
		</XYChart>
	);
};
