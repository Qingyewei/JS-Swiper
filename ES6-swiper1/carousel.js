"use strict";
{
	window.HTMLElement.prototype._left = function (value = '') {
		if (  value !== '' ) { 
			this.style.left = `${value}px`;
			return undefined;
		} else {
			return Number(this.style.left.replace("px","").replace("%",""));
		} 
	}
 

	const STYLE =  {
		SWITCH_CTRL_BUTTON_CONTAINER : {
			zIndex: "99",
			position : "relative",
			height: "11%",
			top : "-11%",
			margin: "0px auto"
		},
		SWITCH_CTRL_BUTTON_ITEM : {
			height: "10px",
			width: "10px",
			float: "left",
			marginLeft: "5px",
			backgroundColor:"#000",
			opacity: "0.5",
			boxShadow: "0px 0px 4px gray",
			borderRadius: "50%"
		},
		SWITCH_CTRL_BUTTON_ITEM_ACTIVE : {
			backgroundColor:"SteelBlue",
			opacity: "1"
		},
		CONTAINE : { 
			display : "block",
			padding : "0px",
			overflow : "hidden",
			textAlign: "center"
		},
		UL : { 
			position : "relative",
			display : "block",
			padding : "0px",
			margin : "0px",
			overflow : "hidden", 
			height : "100%"
		},
		LI : { 
			display : "block",
			padding : "0px",
			listStyle : "none",
			float : "left", 
			height : "100%"
		},
		IMG : {
			width : "100%",
			height : "100%"
		}
	}


	const $ = function (selector = '') {
		let domObjs = document.querySelectorAll(selector);
		return  ( domObjs.length === 1 )  ? 
		            ( domObjs[0] ) :
		            ( domObjs );
	}

	class Carousel {

		constructor (options = '') {
			this.options = options;  
			this.containerDOM = $(`#${this.options.containerId}`);
			this.ulDOM = $(`#${this.options.containerId} ul`);
			this.liDOMS = $(`#${this.options.containerId} ul li`);
			this.imgDOMS = $(`#${this.options.containerId} ul li img`);
			this.speed = 2;
			this.index = 0;
			//init
			if ( this.options.showSwitchCtrl ) this._addSwitchCtrl();
			this._reStyle();
			if ( this.options.playAuto ) this._round();
		}

		set (index = 0) {
			if ( index === this.index ) return undefined;
			if ( index < this.index ) { 
				this._jumpItem(true, index); 
			}
			if ( index > this.index ) {
				this._jumpItem(false, index); 
			}
		}

		previous () { 
			if (  this.index <= 0 ) return this.index;
			this.index --;
			this._switchItem(true);
			return this.index; 
		}

		next  () {
			if (  this.index >= this.liDOMS.length - 1 ) return this.index;
			this.index ++;
			this._switchItem(false);
			return this.index;
		}

		reset () {
			this.index = 0;
			this.ulDOM._left(0); 
			this._setSwitchCtrlStyle(0);
		}

		_switchItem (direction = true) {
			if ( this.options.playSlowMotion ) {
				let len = 0;
				let timer = setInterval(()=>{
					len+=this.speed;
					let distance = ( direction ) ? this.ulDOM._left() + this.speed : this.ulDOM._left() - this.speed ;
					this.ulDOM._left(distance);
					if (  this.containerDOM.offsetWidth === len )  clearInterval(timer); 
					if (  Math.abs(Number(this.containerDOM.offsetWidth) - len ) === 1 ) { 
					       distance = ( direction ) ?  this.ulDOM._left() + 1 : this.ulDOM._left() - 1 ;
					       this.ulDOM._left(distance);
					       clearInterval(timer);
					}
				},0.1); 
			} else {
				this.ulDOM._left(this.ulDOM._left() + Number(this.containerDOM.offsetWidth)); 
			}
			this._setSwitchCtrlStyle(this.index);
		}
 
		_jumpItem (direction = true, index = 0) {
			direction ? this.previous() : this.next(); 
			let timer = setInterval(()=>{  
				console.log(index , this.index);
				if ( index === this.index) { 
					clearInterval(timer) ;
				} else {
					direction ? this.previous() : this.next(); 
				}
			}, Math.abs(this.index - index)  * 10); 
		}

		_reStyle () {  
			// set container style
			for (let key in STYLE.CONTAINE)  this.containerDOM.style[key] = STYLE.CONTAINE[key]; 
			// set container > ul style
			this.ulDOM.style.width = this.liDOMS.length * this.containerDOM.offsetWidth + "px"; 
			for (let key in STYLE.UL)  {
				this.ulDOM.style[key] = STYLE.UL[key];  
			}
			// set ul > li style
			for (let key in STYLE.LI) { this.liDOMS.forEach((dom, index) =>{
				dom.style[key] = STYLE.LI[key]; 
				dom.style.width = `${this.containerDOM.offsetWidth}px`; 
			});}
			// set ul > li > img style
			for (let key in STYLE.IMG)  this.imgDOMS.forEach((dom) =>{dom.style[key] = STYLE.IMG[key]}); 
		}

		_round () { 
			let len = -1;
			this.timer = setInterval(()=>{
				len++; 
				if (  len < this.liDOMS.length - 1 ) {
					this.next(); 
					this.options.playFn();
				}
				if (  len === this.liDOMS.length - 1 ) {
					len = -1;
					this.reset();
				}
			},Number(this.options.playInterval) + Number(this.containerDOM.offsetWidth/this.speed) + 2000);
		}

		_addSwitchCtrl () {
			let buttonContainerDOM = document.createElement("div");
			let buttonItems = new Array();
			buttonContainerDOM.style.width = 15 * this.liDOMS.length + "px";
			for (let key in STYLE.SWITCH_CTRL_BUTTON_CONTAINER)  {
				buttonContainerDOM.style[key] = STYLE.SWITCH_CTRL_BUTTON_CONTAINER[key];  
			}
			for (let i = 0; i < this.liDOMS.length; i++) {
				buttonItems[i] = document.createElement("div");
				for (let key in STYLE.SWITCH_CTRL_BUTTON_ITEM)  {
					buttonItems[i].style[key] = STYLE.SWITCH_CTRL_BUTTON_ITEM[key];  
				}
				buttonContainerDOM.appendChild(buttonItems[i]);
			} 
			this.buttonContainerDOM = buttonContainerDOM;
			this.containerDOM.appendChild(buttonContainerDOM);
			this._setSwitchCtrlActiveStyle(0);
		}

		_setSwitchCtrlStyle (index = 0) {
			let buttonItems = this.buttonContainerDOM.childNodes;
			buttonItems.forEach((dom)=>{
				dom.style.backgroundColor = STYLE.SWITCH_CTRL_BUTTON_ITEM.backgroundColor;
				dom.style.opacity = STYLE.SWITCH_CTRL_BUTTON_ITEM.opacity;
			});
			this._setSwitchCtrlActiveStyle(index);
		}

		_setSwitchCtrlActiveStyle (index = 0) {
			let buttonItems = this.buttonContainerDOM.childNodes;
			buttonItems[index].style.backgroundColor = STYLE.SWITCH_CTRL_BUTTON_ITEM_ACTIVE.backgroundColor;
			buttonItems[index].style.opacity =  STYLE.SWITCH_CTRL_BUTTON_ITEM_ACTIVE.opacity;
		}

	}

	window.Carousel = ( window && !window.Carousel ) ? Carousel : undefined;
}