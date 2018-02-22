export const routeOrganizer = (service, routes) => service.reduce((acc, routeGroup) => {
  routes.forEach((route) => {
    if (routeGroup.name.includes(route.route_id)) {
      if (!acc[routeGroup.name]) { acc[routeGroup.name] = []; }
      if (routeGroup.name === 'SIR') {
        if (route.route_id !== 'R') { 
          acc[routeGroup.name].push(route); 
        }
      } else {
        acc[routeGroup.name].push(route);
      }
    }
  });
  return acc;
}, {});