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

------------------------------------------------------------

I will go over the optimization/testing/perfomance process here.

In terms of debugging I went into chrome devtools and checked mostly using layout shifting for mobile preview. As far as traditional bugs I fixed most of those
during the initial development of the program (as far as I know). What I did find was the navigate was still running even for empty search values which is
unintended behaviour. This fix involved checking null search values.

For layout I found that mobile was very messed up, with layout shifting, and eventually I would realize overflow from nav (initially I thought it was root auto aligning itself
to right of viewport).

As farm as optimization I found the only rerender was the movieCard previews in the moviePage so I went about memoizing them.

My focus on testing was that components were rendering properly with the correct information and were present in the document flow. For interactive components I also
focused that their callback functions would be called properly.

During testing I found a bug where null values for revenue and budget would through runtime errors as they were being checked in ternary operator expression. This has
since been changed to account for null values.

For layout I mostly focused on shifting to a vertical friendly layout and fixed overflow by scaling down search bar sizing and vertically flexing it with top rated and genres.

I memoized movieCard with specific checks for all object fields to make sure it would not be rendered for identical movie information (as identical objects would still
be counted as a new instance even if they have the same information for rendering in the app).
