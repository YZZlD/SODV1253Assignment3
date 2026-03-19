My basic approach to developing this app was first figuring out the different API data and using it to design the different display components.

Next I focused on grabbing and manipulating data from the TMDB API through basic useEffect hook calls to get a flow of
API -> Components -> Movie List done.

Once I finished the basic flow for all necessary routing I shifted my focus on to routing.

I struggled with architecture initially once I started working on the routing as I found trying to develop the genres/search/toprated
displays with state and combining url was overly complex and kind of conflicted. Here is where I decided to shift to solely url based
parameters for useEffect hooking and this simplified the architecture a lot. Allowing for navigate() to handle both visual routing and
internal logic with url parameters.

Finally I developed the usePortal() modal overlay to display specific movie information, and added the navigation bar to allow for
UI/UX interaction to get back to topRated routes and implemented the genres dropdown to allow for genre selection

In addition I already had the logic for genre routing and genre labels in the movieDetails modals so I decided to make them buttons
and allow for them to control routing.


Overall the use of navigation() based architecture reduced the complexity of the project and allowed for consistency between different portions of the project.
