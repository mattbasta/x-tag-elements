(function(){

	var attr = 'data-toggled';
	var toggleState = 'data-toggle-state';

	var getTargets = function(){
		var targetset = this.getAttribute('data-targetset');
		if (targetset) {
			var targets = targetset.split(' ');
			targets.forEach(function(item, i){
				var element = document.getElementById(item);
				element ? targets[i] = element : delete targets[i];
			});
		}
		return targets || [this.nextElementSibling];
	}

	var toggle = function(){
		getTargets.call(this).forEach(function(item){
			item[(item.attributes[attr] ? 'remove' : 'set') + 'Attribute'](attr, null);
		});
	}
	
	var flipState = function(){
		this.setAttribute(toggleState, this.attributes[toggleState] && this.getAttribute(toggleState) == 'open' ? 'close' : 'open');
	};

	xtag.addEvent(document, 'click:delegate(x-toggler)', function(e){
		toggle.call(this);
		flipState.call(this);
	});

	xtag.register('x-toggler', {
		onCreate: function(){
			this.setAttribute('tabindex', 0);
		},
		onInsert: function(){
			if (this.attributes[toggleState]){
				getTargets.call(this).forEach(function(item){
					flipState.call(this);
				});
			}
		},
		setters: {
			
		},
		getters: {
			'state': function(){
				return this.getAttribute(targetState);
			}
		},
		methods: {
			toggle: toggle
		}
	});

})();