window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
  
  	var $rootEl = $("#main");

  	this.boards = new TrelloClone.Collections.Boards();
  	this.boards.fetch();
  	new TrelloClone.Routers.Router($rootEl, this.boards);
  	Backbone.history.start()


  }
};
