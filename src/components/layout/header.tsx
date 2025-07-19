"use client";

import { ModeToggle } from "@/components/shared/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Bell, Code, Menu, Search } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">
              منصة البرمجة
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              الرئيسية
            </Link>
            <Link
              href="/problems"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              المسائل
            </Link>
            <Link
              href="/friends"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              الأصدقاء
            </Link>
            <Link
              href="/badges"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              الشارات
            </Link>
            <Link
              href="/news"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              الأخبار
            </Link>
            <Link
              href="/blog"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              المدونة
            </Link>
            <Link
              href="/admin/login"
              className="text-gray-600 hover:text-red-600 transition-colors"
            >
              الإدارة
            </Link>
          </nav>

          {/* Search */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="ابحث عن المسائل..." className="pr-10 w-64" />
            </div>

            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>

            <ModeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>أح</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/profile">الملف الشخصي</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>الإعدادات</DropdownMenuItem>
                <DropdownMenuItem>تسجيل الخروج</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
