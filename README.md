Hi!


Okay so here is the dealio.

This stuff, as of right now, is using a microservice architecture. It is
powered by zeit micro, zeit now, and create react app.

# Frontend

"frontend" contains the frontend code. The way to deploy it right now is
to build it to a static file (`npm run build`), `cd` into the build
directory, delete the `static/js/main-blahblahblah.js.map` file (because it is
really big and puts us over the filesize limit for the free zeit now tier, and
the map file isn't actually required for execution it is only for debugging),
and then run `now` (from zeit now), and when it is finished building I point
the `cp-api.tech` domain at the new build.

Very little of that last paragraph will make sense unless you are familiar with
zeit now. Luckily for you, chances are we are moving to amazon, so that doesn't
matter!

If you want to develop the frontend locally, run `npm start` from the `frontend`
directory. You should understand the rest.


# plans, templates, auth

These are separate microservices. You run them with `npm run dev` if you are
developing locally. Each of these servers handles one logical component.

The *auth* microservice lets you register or login. If you do, it gives you a
JWT. That is it. The frontend need only access it once. Isn't that nifty?

The *plans* microservice handles saving/loading of plans (and such).

The *templates* microservice handles publishing and retrieving templates. At
the time of this writing, it also handles school data. __zeit now has a
limit of 3 servers on the free tier__, so I piggybacked the school endpoints
into this microservice. They should be separate.

There is a bash script called `start-dev-api.sh`. This runs all three
microservices in a tmux session.


uhhhh, any more questions, ask me. Idk what else to put in atm.
