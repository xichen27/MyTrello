TrelloClone.Views.BoardIndex = Backbone.CompositeView.extend({

	template: JST["boards/index"],

	initialize: function(){
		this.listenTo(this.collection, "sync", this.render);
		this.listenTo(this.collection, "add", this.addBoard);
		this.listenTo(this.collection, "remove", this.removeBoard);
		this.form = new TrelloClone.Views.BoardForm();
		this.collection.each(function(board){
			this.addBoard(board)
		}.bind(this))
	},

	addBoard: function(board){
			var boardIndexItem = new TrelloClone.Views.BoardIndexItem({model: board})
			this.addSubview(".boards", boardIndexItem);
	},

	addform: function(){
		this.addSubview(".board-form", this.form);
	},

	
	render: function(){
		var that = this
		var content = this.template({});
		this.$el.html(content);
		this.attachSubviews();
		this.addform();
		return this;
	},

	removeBoard: function(board){
		var board = _.find(this.subviews(".boards"), function(subview){
			return subview.model === board;
		});

		this.removeSubview(".boards", board);
	}

})


   