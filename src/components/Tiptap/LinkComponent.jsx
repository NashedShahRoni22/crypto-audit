"use client";
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function LinkComponent({ editor, children }) {
  const [linkUrl, setLinkUrl] = useState();
  const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false);

  const handleSetLink = () => {
    if (linkUrl) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkUrl })
        .run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink().run();
    }
    setIsLinkPopoverOpen(false);
    setLinkUrl("");
  };

  return (
    <Popover open={isLinkPopoverOpen} onOpenChange={setIsLinkPopoverOpen}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <h2>Insert Link</h2>
        <Input
          placeholder="https://example.com"
          type="url"
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
        />
        <Button variant="outline" onClick={() => setIsLinkPopoverOpen(false)}>
          Cancel
        </Button>
        <Button className="bg-brand" onClick={handleSetLink}>
          Save
        </Button>
      </PopoverContent>
    </Popover>
  );
}
