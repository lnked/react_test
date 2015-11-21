;(function ($) {
	"use strict";

	$.app = $.app = $.app || {};
	
	$.app = {

		leaderBoard: {},

		init: function()
		{
			var _this = this;

			// _this.scroll.init();
			_this.tabs.init();
			_this.component.init();
			
			var App = React.createClass({

				getInitialState: function()
				{
					return {
						current: 0,
						navs: [
							{ title: 'all games', url: '' },
							{ title: 'eggz', url: '' },
							{ title: 'Spider Solitaire', url: '' },
							{ title: 'eggz', url: '' },
							{ title: 'item 1', url: '' },
							{ title: 'item 2', url: '' },
							{ title: 'item 3', url: '' },
							{ title: 'item 4', url: '' },
							{ title: 'item 5', url: '' },
							{ title: 'item 6', url: '' },
						],

						active: 0,
						tabs: [
							{ title: 'Today',		url: './json/tab1.json', content: null },
							{ title: 'This week', 	url: './json/tab2.json', content: null },
							{ title: 'all time', 	url: './json/tab3.json', content: null }
						]
					};
				},

				propTypes: {
					title: React.PropTypes.string.isRequired
				},
			    
				handleNavClick: function(index)
				{
					this.setState({
						current: index
					})
				},

				handleTabClick: function(index)
				{
					this.setState({
						active: index
					})
				},

			    render: function() {
			        return <div>
			            <header className={"layout-header clearfix"}>
		        			<section className={"layout-header__wrapper"}>
		        				<_this.leaderBoard.logo/>
		        				<_this.leaderBoard.tabs tabs={this.state.tabs} active={this.state.active} onTabClick={this.handleTabClick}/>
		        				<_this.leaderBoard.sandwich/>
	        				</section>
		        		</header>

		        		<_this.leaderBoard.container>
		        			<_this.leaderBoard.navigation navs={this.state.navs} current={this.state.current} onNavClick={this.handleNavClick}/>
							<_this.leaderBoard.tabContent tabs={this.state.tabs} active={this.state.active}/>
		        		</_this.leaderBoard.container>
			        </div>;
			    }

			});

			React.render(
				<App />, document.getElementById('leaderboard')
			);

			// setTimeout(function(){
			// 	_this.scroll.init();
			// }, 100);
		}

	};

})(jQuery);