exports.isAuth = (req, res, next) => {
  if(!req.isAuthenticated()) {
    res.render('access-denied', {
      title: 'Access Denied',
      message: 'You need to be signed in to do that.',
    });
  }

  next();
}

exports.isMember = (req, res, next) => {
  if(!(req.isAuthenticated() && req.user.isMember)) {
    res.render('access-denied', {
      title: 'Access Denied',
      message: 'You need to be a member to do that',
    });
  }

  next();
}

exports.isAdmin = (req, res, next) => {
  if(!(req.isAuthenticated() && req.user.isMember && req.user.isAdmin)) {
    res.render('access-denied', {
      title: 'Access Denied',
      message: 'You need to be an admin to do that',
    });
  }

  next();
}
