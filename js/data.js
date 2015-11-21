
var w = 650,
	h = 650;

var colorscale = d3.scale.category10();

//Legend titles
var LegendOptions = ['Smartphone','Tablet'];

$.getJSON('https://gist.githubusercontent.com/brunojppb/9248a4778b4d874c92a4/raw/38e09dc344a1856462521ef636d3f6a50ec54a88/despesas_2015.json', function(despesas) {
	var janeiro = despesas.despesas[0].janeiro[0];
	var fevereiro = despesas.despesas[0].fevereiro[0];
	var marco = despesas.despesas[0].marco[0];
	var abril = despesas.despesas[0].abril[0];
	var maio = despesas.despesas[0].maio[0];
	var junho = despesas.despesas[0].junho[0];
	var julho = despesas.despesas[0].julho[0];
	var agosto = despesas.despesas[0].agosto[0];
	var setembro = despesas.despesas[0].setembro[0];
	var outubro = despesas.despesas[0].outubro[0];
	var novembro = despesas.despesas[0].novembro[0];
	var dezembro = despesas.despesas[0].dezembro[0];

	//Data
	var d = [
			  [
				{axis:"LEGISLATIVA",value:34521550},
				{axis:"Social Networks",value:0.56},
				{axis:"Internet Banking",value:0.42},
				{axis:"News Sportsites",value:0.34},
				{axis:"Search Engine",value:0.48},
				{axis:"View Shopping sites",value:0.14},
				{axis:"Paying Online",value:0.11},
				{axis:"Buy Online",value:0.05},
				{axis:"Stream Music",value:0.07},
				{axis:"Online Gaming",value:0.12},
				{axis:"Navigation",value:0.27},
				{axis:"App connected to TV program",value:0.03},
				{axis:"Offline Gaming",value:0.12},
				{axis:"Photo Video",value:0.4},
				{axis:"Reading",value:0.03},
				{axis:"Listen Music",value:0.22},
				{axis:"Watch TV",value:0.03},
				{axis:"TV Movies Streaming",value:0.03},
				{axis:"Listen Radio",value:0.07},
				{axis:"Sending Money",value:0.18},
				{axis:"Other",value:0.07},
				{axis:"Use less Once week",value:0.08}
			  ],[
				{axis:"Email",value:0.48},
				{axis:"Social Networks",value:0.41},
				{axis:"Internet Banking",value:0.27},
				{axis:"News Sportsites",value:0.28},
				{axis:"Search Engine",value:0.46},
				{axis:"View Shopping sites",value:0.29},
				{axis:"Paying Online",value:0.11},
				{axis:"Buy Online",value:0.14},
				{axis:"Stream Music",value:0.05},
				{axis:"Online Gaming",value:0.19},
				{axis:"Navigation",value:0.14},
				{axis:"App connected to TV program",value:0.06},
				{axis:"Offline Gaming",value:0.24},
				{axis:"Photo Video",value:0.17},
				{axis:"Reading",value:0.15},
				{axis:"Listen Music",value:0.12},
				{axis:"Watch TV",value:0.1},
				{axis:"TV Movies Streaming",value:0.14},
				{axis:"Listen Radio",value:0.06},
				{axis:"Sending Money",value:0.16},
				{axis:"Other",value:0.07},
				{axis:"Use less Once week",value:0.17}
			  ]
			];

	//Options for the Radar chart, other than default
	var mycfg = {
	  w: w,
	  h: h,
	  maxValue: 0.6,
	  levels: 6,
	  ExtraWidthX: 300
	}

	//Call function to draw the Radar chart
	//Will expect that data is in %'s
	RadarChart.draw("#chart", d, mycfg);

	////////////////////////////////////////////
	/////////// Initiate legend ////////////////
	////////////////////////////////////////////

	var svg = d3.select('#body')
		.selectAll('svg')
		.append('svg')
		.attr("width", w+300)
		.attr("height", h)

	//Create the title for the legend
	var text = svg.append("text")
		.attr("class", "title")
		.attr('transform', 'translate(90,0)') 
		.attr("x", w - 70)
		.attr("y", 10)
		.attr("font-size", "12px")
		.attr("fill", "#404040")
		.text("What % of owners use a specific service in a week");
			
	//Initiate Legend	
	var legend = svg.append("g")
		.attr("class", "legend")
		.attr("height", 100)
		.attr("width", 200)
		.attr('transform', 'translate(90,20)') 
		;
		//Create colour squares
		legend.selectAll('rect')
		  .data(LegendOptions)
		  .enter()
		  .append("rect")
		  .attr("x", w - 65)
		  .attr("y", function(d, i){ return i * 20;})
		  .attr("width", 10)
		  .attr("height", 10)
		  .style("fill", function(d, i){ return colorscale(i);})
		  ;
		//Create text next to squares
		legend.selectAll('text')
		  .data(LegendOptions)
		  .enter()
		  .append("text")
		  .attr("x", w - 52)
		  .attr("y", function(d, i){ return i * 20 + 9;})
		  .attr("font-size", "11px")
		  .attr("fill", "#737373")
		  .text(function(d) { return d; })
		  ;	
});