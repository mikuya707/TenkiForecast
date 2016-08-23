'use strict'

const Rx = require('rx');
const _ = require('lodash');

class UIService {
	constructor(){
		this.geolocObservable = new Rx.Subject();
		this.unitObservable = new Rx.Subject();
	}
	setLocation(loc){
		this.geolocObservable.onNext(loc);
	}
	setUnit(unit){
		this.unitObservable.onNext(unit);
	}
}

module.exports = new UIService();