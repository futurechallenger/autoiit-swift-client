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
            CreateView()
                .tabItem {
                    Label("Create", systemImage: "cross")
                }
            ExploreView()
                .tabItem {
                    Label("Explore", systemImage: "square.and.pencil")
                }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        MainView()
    }
}
