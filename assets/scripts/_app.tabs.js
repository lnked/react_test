;(function ($) {
	"use strict";

	$.app = $.app = $.app || {};

	$.app.tabs = {

		init: function()
		{
			var leaderBoard = $.app.leaderBoard;

			leaderboard.person = React.createClass({
			    render: function() {
			    	
			    	var user = this.props.data;

			        return 	<article className={"person clearfix" + (user.winner ? " winner" : "") + (user.stand ? " stand" : "")}>
			        			<div className="person__shadow"></div>
			        			<div className="person__avatar">
		        					<img src={user.avatar} className="person__avatar__src" alt=""/>
			        			</div>
			        			
			        			{user.star ? <div className={"person__star " + user.star}></div> : ''}

			        			<div className="person__place">{user.place}</div>
			        			<div className="person__name">
			        				<span className="person__name__middle">
				        				{user.name}
			        				</span>
		        				</div>
			        			<div className="person__score">{user.score}</div>
			        		</article>;
			    }
			});

			leaderBoard.tabs = React.createClass({
			    onClick: function(index)
			    {
			    	this.props.onTabClick(index);
			    },

				render: function()
				{
					var active = this.props.active;

					var tabs = this.props.tabs.map(function(item, index) {
						
						return 	<li className={'tabs__item'}>
									<span data-loadurl={item.loadUrl} className={'tabs__item__tab ' + (active === index ? 'active' : '')} onClick={this.onClick.bind(this, index)}>
										{item.title}
									</span>
								</li>;

					}.bind(this));

					return <ul className={'tabs'}>{tabs}</ul>;
				}
			});
			
			leaderBoard.tabContent = React.createClass({
				
				getInitialState: function()
				{
					return {
						cache: {}
					};
				},

				componentDidMount: function()
				{
					var _this = this, cache = {};
					
					this.checkResize();

					this.props.tabs.map(function(tab, index) {
						
						$.ajax({
				            url: tab.url,
				            type: 'GET',
				            success: function(response)
				            {
				            	cache = _this.state.cache;
				            	cache[index] = response;

				            	_this.setState({
									cache: cache
								});
								
				            },
				            dataType: 'JSON'
						});

				    });
				},

				componentDidUpdate: function()
				{
					if (typeof $('.js-scroll-tab').data('jsp') !== 'undefined')
					{
						$('.js-scroll-tab').data('jsp').destroy();
					}

					if ($(window).width() > 375)
					{
						this.changeBox($('#selected-panel').find('.person').length);
						$.app.scroll.init('.js-scroll-tab', true, 375);
					}
				},

				checkResize: function()
				{
					var throttleTimeout;

					$(window).on('resize', function(){
						if (!throttleTimeout) {
							throttleTimeout = setTimeout(function() {
								
								if (typeof $('.js-scroll-tab').data('jsp') == 'undefined' && $(window).width() > 375)
								{
									console.log("init");
									$.app.scroll.init('.js-scroll-tab', true, 375);
								}
								
								throttleTimeout = null;
							}, 50);
						}
					});
				},

				changeBox: function(count)
				{
					$('#selected-panel').width(count*112);
				},

				getData: function()
				{
					return this.state.cache[this.props.active];
				},

				render: function()
				{
					var data = this.getData();

					if (typeof data !== 'undefined' && data.length)
					{
						var persons = data.map(function(person) { return <leaderboard.person data={person} /> });

						return <div className="tabs__content scroll-pane js-scroll-tab">
							<div role="tabpanel" id="selected-panel" className={'tabs__panel selected'}>
								{persons}
							</div>
					    </div>;
				    }

					return <div />;
				}
			});

		}

	};

})(jQuery);