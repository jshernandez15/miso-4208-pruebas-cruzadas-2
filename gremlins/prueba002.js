javascript:(function(){
	function callback(){
        gremlins.createHorde()
            .before(function (done) {
                var horde = this;
                setTimeout(function () {
                    horde.log('async');
                    done();
                }, 500);
            })
            .before(function () {
                this.log('sync');
            })
            .seed(1140369940)
            .gremlin(gremlins.species.formFiller())
            .gremlin(function () {
                $("button[type='submit']").click();
                console.log("custom gremlin click submit");
            })
            .gremlin(gremlins.species.clicker().clickTypes(['click']))
            .gremlin(gremlins.species.scroller())
            .strategy(gremlins.strategies.distribution()
                .delay(50) // wait 50 ms between each action
                .distribution([0.5, 0.1, 0.3, 0.1]) // the first gremlin have more chances to be executed than the last
            )
            .mogwai(gremlins.mogwais.alert())
            .mogwai(gremlins.mogwais.gizmo().maxErrors(5))
            .unleash();
	} 
	var s=document.createElement("script");
	s.src="https://rawgithub.com/marmelab/gremlins.js/master/gremlins.min.js";
	if(s.addEventListener){
		s.addEventListener("load",callback,false);
	}
	else if(s.readyState){
		s.onreadystatechange=callback;
	}
	document.body.appendChild(s);
})();