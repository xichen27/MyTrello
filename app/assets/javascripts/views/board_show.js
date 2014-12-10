TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
	template: JST["boards/board_show"],

	initialize: function(){
		this.listenTo(this.model, "sync", this.render);
		this.lists = this.model.lists();
		this.listenTo(this.lists, "add", this.addList);
		this.lists.each(function(list){
			this.addList(list);
		}.bind(this))
		this.addListForm();
	},

	events: {
		// "sortstart .lists-list": "beginSortList",
		"sortstop .lists-list": "endSortList"
	},

	addList: function(list){
		var listItem = new TrelloClone.Views.ListItem({ model: list, board: this.model });
		this.$el.find("ul.cards-list").attr("data-id", list.id);
		this.addSubview('.lists-list', listItem);
	},

	addListForm: function(){
		var list_form = new TrelloClone.Views.ListForm({model: this.model, collection: this.lists});
		this.addSubview(".new-list", list_form);
	},

	assignOrd: function(){	
		_(this.subviews('.lists-list')).each(function(subview){
			var ord = subview.$el.index();
			subview.model.set({ord: ord});
			subview.model.save();
		})
	},

	// beginSortList: function(event){
	// 	var $target = $(event.toElement);
	// 	this.assignOrd();
	// 	debugger
	// 	var sort_list = _.find(this.subviews(".lists-list"), function(subview){
	// 		return subview === $target
	// 	})
		
	// },

	endSortList: function(){
	var $target = $(event.toElement);
		this.assignOrd();
	},

	render: function(){
		var content = this.template({board: this.model});
		this.$el.html(content);
		this.attachSubviews();
		this.onRender();
		this.$(".lists-list").sortable();
		
		return this
	}
	
})