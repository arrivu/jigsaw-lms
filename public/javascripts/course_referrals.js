/**
 * Copyright (C) 2013 Arrivu Infotech ,Pvt..
 *
 * This file is part of Arrivu.
 *
 * Arrivu is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Arrivu is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
define([
  'jquery' /* $ */,
  'underscore',
  'jqueryui/tabs' /* /\.tabs/ */
], function($, _) {


  $(document).ready(function() {
        $tabBar = $("#course_reference_tabs"),
        // as of jqueryui 1.9, the cookie trumps the fragment :(. so we hack
        // around that here
        initialTab = _.indexOf(_.pluck($tabBar.find('> ul a'), 'hash'), location.hash);
        $tabBar.tabs({cookie: {}, active: initialTab >= 0 ? initialTab : null}).show();

  });
});
