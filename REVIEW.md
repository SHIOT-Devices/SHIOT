# Midterm Review
Excellent documentation. Although I'm not following the steps to install the
pi64 I feel confident I could follow your instructions and get it set up.

## .env Documentation
Great job providing a sample `.env` file with `.env.tmp`. Others, and yourself
in the future, thank you for it.

## Routing
Your routes are confusing and contradictory. You have three router endpoints
attached to `GET /api/admin/`.

The filenames `router.js` and `resource-router.js` are non-descriptive.
Name them like "Auth Router" and name the second after whatever your resource
actually is.

It's not a bad idea to keep the few HTML page routes in the server itself and bring
them out of `router.js` which seems to deal only with auth routes.

Both your `router.js` and `resource-router.js` files serve up the
`admin.html`, but they do it at different URLs. Again, confusing and
contradictory. Strive for a single source of truth.

## Code Style
Eliminate dead and commented-out code. Let source control store historical
information.

The files `server2.js` and `sotrage.js` look like unused dead files. Remove
them.

Strange file name at `test/user..js`. I'm not pointing all these things out to
be a jerk, I'm pointing them out so you can remove them and make this repo look
super professional.

Look at the three comments inside `test/user.test.js`.

1. The first explains why Math.random() is being used in an odd context.
2. The second comments out a variable `params` that used to be used.
3. The third comments out a test block that used to exist.

The first comment is good. It helps people understand the program. The other two
comments are messy. Go back and simply delete that code. If anyone every truly
needs access to see what was there they can access it through source control.

## Models
Choose a better name for `models/resources.js`. Model filenames are usually
named in singular, not plural. The `model/user.js` model filename is singular.
You have one plural and one singular. It's a small thing, but these inconsistencies
can drive you nuts and waste your time on large projects.

### User Model
Can you explain what the `findHash` property for the user model does? This looks like
something taken from watching videos from a daytime class.

## Testing
Add the `coverage` directory to your `.gitignore`. It doesn't need to be
added to the repo.

## New Technologies
Great job taking the time to research, learn, and implement new technologies! Very
impressive.

## Front End Code
Go through and clean up your front end code. Eliminate console.log statements
now that you have more confidence your application behaves as expected. Consider
moving `<script>` blocks to their own files and serving them from our `/public` dir.
Delete commented-out code and HTML.