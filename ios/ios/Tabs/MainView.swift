//
//  ContentView.swift
//  ios
//
//  Created by Uncle Charlie on 2022/12/4.
//

import SwiftUI

struct MainView: View {
  var body: some View {
    TabView {
      HomeView()
        .tabItem {
          Label("My flow", systemImage: "list.dash")
        }
      ExploreView()
        .tabItem {
          Label("Explore", systemImage: "square.and.pencil")
        }
      CreateView()
        .tabItem {
          Label("Create", systemImage: "plus.circle")
        }
      ActivityView()
        .tabItem {
          Label("Activity", systemImage: "list.bullet")
        }
      ProfileView()
        .tabItem {
          Label("Profile", systemImage: "person")
        }
    }
  }
}

struct ContentView_Previews: PreviewProvider {
  static var previews: some View {
    MainView()
  }
}

