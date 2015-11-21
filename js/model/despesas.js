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

	console.log(janeiro.executada);
});