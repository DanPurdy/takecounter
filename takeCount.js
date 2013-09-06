(function($){

	$.fn.takeCounter = function(options) {

		//object of default key values for a numpad
	var defaults = {
		takeUp : 107, //plus symbol (+)
		takeDown : 109, //minus symbol (-)
		takeSel : 106, //asterix (*)
		passUp : 102, //6 Key (6)
		passDown : 105, //9 Key (9)
		passNewInit : 103, //7 Key (7)
		togglePass : 100, //4 Key (4)
		countReset : 110, //period key (.)

	};

		options = $.extend(defaults, options);


		return this.each(function(){
			
			$target=$(this);
			
			//initialize variables and selectors
			var take = 1,
				pass= 1,
				limit=999,
				passVis=true,

				$state = $target.find('#state'),
				current = $state.text('Next'),
				
				$passBox = $target.find('.pass-count'),
				$takeBox = $target.find('.take-count'),
				$passDiv = $target.find('#pass'),
				$takeDiv = $target.find('#take');

				console.log($passBox);
			//sets $state of counter to Now (indicates current take is recording)
			function stateNow(){
				current='Now';
				$state.text(current).removeClass('next').addClass('now');
				
			}

			//sets $state of counter to Next (indicates next take is ready)
			function stateNext(){
				current='Next';
				$state.text(current).removeClass('now').addClass('next');
				
			}

			//allows the pass feature to be hidden meaning only takes being used
			function hidePass(){
				passVis=false;
				limit=99999;
				$passBox.addClass('hidden');
				$takeBox.css({width : '100%'});
			}

			//allows the pass feature to be enabled again meaning both takes and pass's being used
			function showPass(){
				passVis=true;
				limit=999;
				
				$passBox.removeClass('hidden');
				$takeBox.css({width : '50%'});
			}

			//on a keydown event pass the event to a function
			$(window).keydown(function(event){
				//store the current keycode (key that's been pressed)
				key = event.keyCode;
				
				switch(key) //switch to perform action on selected key press
				{

				case defaults.takeUp:       //increments take

					if(take <limit){

						if(current=='Now'){
							take++;
							stateNext();

						}else{

							stateNow();

						}

					}else if(take ==limit && current !='Now'){
						stateNow();

					}
					
				break;

				case defaults.takeDown:      //decrement take
					
					if(take>1){
						take-=1;
						stateNow();
					}

				break;

				case defaults.takeSel:      //prompt user for take number 
					
					take = parseInt(prompt("Take?"),10)|| take;
					stateNext();
					
					if(take >limit){
						take=limit;
					}else if(take < 1){
						take=1;
					}

				break;

				case defaults.passUp:       //increment pass
					if(passVis===true){
						pass++;
					}

				break;

				case defaults.togglePass:      //Toggle whether pass is visible/needed if hidden none of the pass features work
					if($passBox.hasClass('hidden')){
						showPass();
						
					}else{
						hidePass();
					}

				break;

				case defaults.passDown:      //decrement pass
					if(passVis===true && pass >1){
						pass--;
					}

				break;

				case defaults.passNewInit:    //Increment pass and reset take (new pass default)
					if(passVis===true && pass <=999){
						pass++;
						take=1;
						
						stateNext();
					}
				break;
				
				case defaults.countReset:      //Reset the take counter to default (user has to acknowledge)
					var answer=confirm('Reset?');
					if (answer===true){
						pass = 1;
						take = 1;
						stateNext();
					}

				break;
				}

				$takeDiv.text(take); //set the take value on screen
				$passDiv.text(pass); //set the pass value on screen
			});

		});
	} ;

	
	
})(jQuery);