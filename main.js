angular.module('Mortgage.Demo',[])
.run(function($rootScope){
	// 11 Sunnvale Crescent 1812
	var mortgage = $$$.amortize(136900)
		.interest(function(d,i){
			// var interest = 0.04 + ((i / 12 /  8) * 0.01);
			var interest = 0.04;
			return interest; // interest rate ought to go up
		})
		// .interest('5%')
		.down('20%')
		.period('25y')
		.income('rent',function(d,i){
			return 1300 + i * 3;
		})
		.expense('maintenance',400.75)
		.expense('property tax',1200 / 12)
		.expense('improvements', 900 / 12)
		.expense('down payment interest', function(d,i){
			return d.down() * 0.068 / 12;
		})
		.expense('insurance', function(d,i){
			return d.principal() * 0.005 / 12;
		})
		.expense('property management',function(d,i){
			return d.income('rent').value(d,i) * 0.8;
		})
		.income('parking',120)
		.taxrate(0.37);


	$rootScope.mortgage = mortgage;
	$rootScope.details = {
		price:136900,
		down:13690,
		property_tax:1200,
		taxrate:0.35,
		name:'1812-1152 Sunnyvale Crescent',
		depreciable_percentage:2,
		amortization:25,
		incomes:[{
			name:'Rent',
			value:1100,
			annual_increase:0.03,
			vac_rate:0.15
		}],
		expenses:[{
			name:'Maintenance',
			value:400.75,
			annual_increase:0.03,
			vac_rate:0.15,
			calculated:'flat_rate'
		}]

	}
	$rootScope.balances = mortgage.balances()
	
	$rootScope.simpleBalances = mortgage.balances()
		.filter(function(a,b){return !b||b%60===59});


})