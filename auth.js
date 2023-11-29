const express = require('express');
const passport = require('passport');
const router = express.Router();

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// @desc    Google auth callback
// @route   GET /auth/google/callback
// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  '/google/callback',
  (req, res, next) => {
    passport.authenticate('google', (err, user) => {
      if (err) {
        console.error(err);
        return res.redirect('/login'); // Redirect to login on error
      }
      if (!user) {
        return res.redirect('/login'); // Redirect to login if user not found
      }
      req.logIn(user, (err) => {
        if (err) {
          console.error(err);
          return res.redirect('/login'); // Redirect to login on error during login
        }
        console.log('Google authentication successful');
        return res.redirect('/');
      });
    })(req, res, next);
  }
);


// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    res.redirect('/');
  });
});

module.exports = router;
