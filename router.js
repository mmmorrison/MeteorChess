FlowRouter.route('/', {
  name: 'main',
  action(){
    BlazeLayout.render('layout', {child: 'main'});
  }
});
