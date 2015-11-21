;(function ($) {
	"use strict";

	$.app = $.app = $.app || {};

	$.app.component = {

		init: function()
		{
			var leaderBoard = $.app.leaderBoard;

			leaderBoard.logo = React.createClass({
				render: function()
				{
					return <h1 className={"layout-header__logo"}>leaderboard</h1>;
				}
			});
			
			leaderBoard.sandwich = React.createClass({
				getInitialState: function()
				{
					return {
						active: !1
					};
				},

				onClick: function()
				{
					$('#navigation').toggleClass('open');

					this.setState({
						active: !this.state.active
					});
				},

				render: function()
				{
				    return <span className={'sandwich' + (this.state.active ? ' open' : '')} onClick={this.onClick.bind(this)}><span className="sandwich__layer"></span></span>;
				}
			});

			leaderBoard.navigation = React.createClass({

				onClick: function(index)
			    {
			    	this.props.onNavClick(index);
			    },

				componentDidMount: function()
				{
					$.app.scroll.init('.js-scroll-navigation', false);
				},

			    render: function()
			    {
			    	var current = this.props.current;

					var items = this.props.navs.map(function(item, index) {
						
						return	<li className={"navigation__item"}>
									<a href="#" data-url={item.url} className={'navigation__link' + (current === index ? ' current' : '')} onClick={this.onClick.bind(this, index)}>{item.title}</a>
								</li>

					}.bind(this));

			        return <nav className={"navigation scroll-pane js-scroll-navigation"} id="navigation" role="navigation"><ul className="navigation__list">{items}</ul></nav>;
			    }

			});

			leaderBoard.container = React.createClass({
				render: function()
				{
					return <section className={"layout-content"}>{this.props.children}</section>;
				}
			});
		}

	};

})(jQuery);